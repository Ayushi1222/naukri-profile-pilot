
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Activity } from "lucide-react";

interface StatusPanelProps {
  autoUpdateEnabled: boolean;
  lastUpdate: string | null;
  onToggleAutoUpdate: () => void;
  totalUpdates: number;
}

export const StatusPanel = ({ 
  autoUpdateEnabled, 
  lastUpdate, 
  onToggleAutoUpdate,
  totalUpdates 
}: StatusPanelProps) => {
  const formatLastUpdate = (timestamp: string | null) => {
    if (!timestamp) return "Never updated";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getStatusBadge = () => {
    if (!autoUpdateEnabled) {
      return <Badge variant="secondary">Disabled</Badge>;
    }
    return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Auto-Update Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium">Automatic Updates</p>
            <p className="text-sm text-gray-600">
              Keep your profile fresh and visible to recruiters
            </p>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge()}
            <Switch 
              checked={autoUpdateEnabled}
              onCheckedChange={onToggleAutoUpdate}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <p className="text-sm font-medium">Last Updated</p>
            </div>
            <p className="text-sm text-gray-600">
              {formatLastUpdate(lastUpdate)}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-gray-500" />
              <p className="text-sm font-medium">Total Updates</p>
            </div>
            <p className="text-sm text-gray-600">
              {totalUpdates} updates completed
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
