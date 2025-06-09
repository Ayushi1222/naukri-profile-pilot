
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface UpdateHistoryPanelProps {
  history: any[];
}

export const UpdateHistoryPanel = ({ history }: UpdateHistoryPanelProps) => {
  const getStatusIcon = (status: string) => {
    if (status === 'success') {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'success') {
      return <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>;
    }
    return <Badge variant="destructive">Failed</Badge>;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Update History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No updates yet</p>
            <p className="text-sm text-gray-400">Your update history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((update) => (
              <div key={update.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(update.status)}
                  <div>
                    <p className="text-sm font-medium">{formatTimestamp(update.timestamp)}</p>
                    <p className="text-xs text-gray-600">
                      {update.type === 'manual' ? 'Manual Update' : 'Automatic Update'}
                    </p>
                    {update.details && (
                      <p className="text-xs text-gray-500 mt-1">{update.details}</p>
                    )}
                  </div>
                </div>
                {getStatusBadge(update.status)}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
