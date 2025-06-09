
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Zap, Shield } from "lucide-react";
import { useState, useEffect } from "react";

interface ManualUpdatePanelProps {
  onUpdate: () => void;
  isUpdating: boolean;
}

export const ManualUpdatePanel = ({ onUpdate, isUpdating }: ManualUpdatePanelProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isUpdating) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 60);

      return () => clearInterval(interval);
    }
  }, [isUpdating]);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          Manual Update
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Trigger an immediate profile update to refresh your visibility on Naukri.
          </p>
          
          {isUpdating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Updating profile...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
          
          <Button 
            onClick={onUpdate}
            disabled={isUpdating}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            size="lg"
          >
            {isUpdating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Updating Profile...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Update Profile Now
              </>
            )}
          </Button>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Safe & Secure</span>
          </div>
          <p className="text-xs text-gray-500">
            Updates are performed safely without affecting your profile data. 
            Only minor optimizations like skill reordering and summary refreshing.
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">What gets updated?</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Skills section reordered</li>
            <li>• Profile summary refreshed</li>
            <li>• Last login timestamp updated</li>
            <li>• Profile activity increased</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
