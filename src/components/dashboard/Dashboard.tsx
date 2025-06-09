
import { useState, useEffect } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { StatusPanel } from "./StatusPanel";
import { SchedulerPanel } from "./SchedulerPanel";
import { UpdateHistoryPanel } from "./UpdateHistoryPanel";
import { ManualUpdatePanel } from "./ManualUpdatePanel";
import { PaymentPage } from "../payment/PaymentPage";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(user.profileSettings?.autoUpdateEnabled || false);
  const [lastUpdate, setLastUpdate] = useState(user.profileSettings?.lastUpdate);
  const [updateHistory, setUpdateHistory] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState(user.profileSettings?.scheduleFrequency || 'weekly');
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load update history from localStorage
    const history = JSON.parse(localStorage.getItem(`updateHistory_${user.id}`) || '[]');
    setUpdateHistory(history);
  }, [user.id]);

  const handleManualUpdate = async () => {
    setIsUpdating(true);
    
    // Simulate profile update process
    setTimeout(() => {
      const updateRecord = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: Math.random() > 0.1 ? 'success' : 'failed', // 90% success rate
        type: 'manual',
        details: 'Profile skills reordered, summary updated'
      };

      const newHistory = [updateRecord, ...updateHistory.slice(0, 9)]; // Keep last 10 records
      setUpdateHistory(newHistory);
      localStorage.setItem(`updateHistory_${user.id}`, JSON.stringify(newHistory));
      
      setLastUpdate(updateRecord.timestamp);
      
      // Update user data
      const updatedUser = {
        ...user,
        profileSettings: {
          ...user.profileSettings,
          lastUpdate: updateRecord.timestamp,
          totalUpdates: (user.profileSettings?.totalUpdates || 0) + 1
        }
      };
      localStorage.setItem('naukriUser', JSON.stringify(updatedUser));

      if (updateRecord.status === 'success') {
        toast({
          title: "Profile Updated Successfully!",
          description: "Your Naukri profile has been refreshed and optimized.",
        });
      } else {
        toast({
          title: "Update Failed",
          description: "Unable to connect to Naukri. Please try again later.",
          variant: "destructive",
        });
      }
      
      setIsUpdating(false);
    }, 3000);
  };

  const toggleAutoUpdate = () => {
    const newStatus = !autoUpdateEnabled;
    
    // If enabling auto-update, check if user has paid
    if (newStatus && !user.profileSettings?.isPaid) {
      setShowPaymentPage(true);
      return;
    }
    
    setAutoUpdateEnabled(newStatus);
    
    // Update user settings
    const updatedUser = {
      ...user,
      profileSettings: {
        ...user.profileSettings,
        autoUpdateEnabled: newStatus
      }
    };
    localStorage.setItem('naukriUser', JSON.stringify(updatedUser));

    toast({
      title: newStatus ? "Auto-Update Enabled" : "Auto-Update Disabled",
      description: newStatus 
        ? "Your profile will be automatically updated based on your schedule."
        : "Automatic updates have been turned off.",
    });
  };

  if (showPaymentPage) {
    return <PaymentPage onBack={() => setShowPaymentPage(false)} user={user} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <StatusPanel 
              autoUpdateEnabled={autoUpdateEnabled}
              lastUpdate={lastUpdate}
              onToggleAutoUpdate={toggleAutoUpdate}
              totalUpdates={user.profileSettings?.totalUpdates || 0}
            />
            
            <SchedulerPanel 
              frequency={scheduleFrequency}
              onFrequencyChange={setScheduleFrequency}
              autoUpdateEnabled={autoUpdateEnabled}
            />
            
            <UpdateHistoryPanel history={updateHistory} />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <ManualUpdatePanel 
              onUpdate={handleManualUpdate}
              isUpdating={isUpdating}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
