
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface SchedulerPanelProps {
  frequency: string;
  onFrequencyChange: (frequency: string) => void;
  autoUpdateEnabled: boolean;
}

export const SchedulerPanel = ({ 
  frequency, 
  onFrequencyChange, 
  autoUpdateEnabled 
}: SchedulerPanelProps) => {
  const getNextUpdate = () => {
    if (!autoUpdateEnabled) return "No scheduled updates";
    
    const now = new Date();
    const nextUpdate = new Date(now);
    
    switch (frequency) {
      case 'daily':
        nextUpdate.setDate(now.getDate() + 1);
        break;
      case 'weekly':
        nextUpdate.setDate(now.getDate() + 7);
        break;
      case 'biweekly':
        nextUpdate.setDate(now.getDate() + 14);
        break;
      case 'monthly':
        nextUpdate.setMonth(now.getMonth() + 1);
        break;
      default:
        return "Custom schedule";
    }
    
    return nextUpdate.toLocaleDateString() + " at 10:00 AM";
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Update Scheduler
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Update Frequency</label>
            <Select value={frequency} onValueChange={onFrequencyChange}>
              <SelectTrigger className={!autoUpdateEnabled ? "opacity-50" : ""}>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Next Scheduled Update</span>
            </div>
            <p className="text-sm text-gray-600">{getNextUpdate()}</p>
            {autoUpdateEnabled && (
              <Badge variant="outline" className="mt-2">
                Scheduler Active
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
