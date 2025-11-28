import { useState } from 'react';
import { useChatWorkflow } from '@/hooks/useChatWorkflow';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ActionButtons } from './ActionButtons';
import { FloorPlanSelector } from '@/components/floor-plan/FloorPlanSelector';
import { SubmitReportDialog } from '@/components/report/SubmitReportDialog';
import { HRChatInterface } from '@/components/hr/HRChatInterface';
import { IncidentType, WorkflowState } from '@/types/incident.types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { apiService } from '@/services/api.service';
import type { HRSession } from '@/types/hr.types';

export function ChatInterface() {
  const { messages, isLoading, currentResponse, sendMessage, sessionId } = useChatWorkflow();
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [hrSession, setHrSession] = useState<HRSession | null>(null);
  const [isConnectingHR, setIsConnectingHR] = useState(false);

  const handleActionClick = async (action: string) => {
    const lowerAction = action.toLowerCase();
    
    if (lowerAction.includes('submit')) {
      setShowSubmitDialog(true);
    } else if (lowerAction.includes('connect') && lowerAction.includes('hr')) {
      await connectToHR();
    } else {
      sendMessage(action);
    }
  };

  const connectToHR = async () => {
    setIsConnectingHR(true);
    try {
      const response = await apiService.connectToHR({ sessionId });
      setHrSession({
        connected: response.connected,
        hrPartnerName: response.hrPartnerName,
        hrPartnerImage: response.hrPartnerImage,
        message: response.message,
      });
    } catch (error) {
      console.error('Failed to connect to HR:', error);
      alert('Failed to connect to HR partner. Please try again.');
    } finally {
      setIsConnectingHR(false);
    }
  };

  const handleLocationSelect = (location: string) => {
    sendMessage(location);
  };

  const showFloorPlan =
    currentResponse?.incidentType === IncidentType.FACILITY &&
    currentResponse?.metadata?.requiredFields &&
    Array.isArray(currentResponse.metadata.requiredFields) &&
    (currentResponse.metadata.requiredFields as string[]).includes('where');

  const showHROptions =
    currentResponse?.workflowState === WorkflowState.AWAITING_HR_DECISION &&
    currentResponse?.incidentType === IncidentType.HUMAN;

  const canSubmit =
    currentResponse?.workflowState === WorkflowState.REPORT_READY &&
    (currentResponse?.incidentType === IncidentType.HUMAN ||
      currentResponse?.incidentType === IncidentType.FACILITY);

  if (hrSession?.connected) {
    return (
      <HRChatInterface
        sessionId={sessionId}
        hrSession={hrSession}
        initialMessage={hrSession.message}
        previousMessages={messages}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-primary text-white p-4 shadow-md flex items-center gap-3">
        <img src="/images/logo/SQ.svg" alt="SmartAllies logo" className="h-8 w-8" />
        <h1 className="text-xl font-semibold">SmartAllies Incident Reporting</h1>
      </header>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <Card className="flex-1 flex flex-col m-4 overflow-hidden">
          <MessageList messages={messages} />

          {showFloorPlan ? (
            <div className="p-4 border-t">
              <FloorPlanSelector onLocationSelect={handleLocationSelect} />
            </div>
          ) : null}

          <ActionButtons
            response={currentResponse}
            onActionClick={handleActionClick}
            isLoading={isLoading || isConnectingHR}
          />

          {showHROptions ? (
            <div className="border-t p-4 bg-blue-50">
              <p className="text-sm text-gray-700 mb-3 text-center">
                Would you like to share more details or connect with an HR partner?
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => sendMessage('Share more details')}
                  disabled={isLoading || isConnectingHR}
                >
                  Share More Details
                </Button>
                <Button
                  onClick={() => handleActionClick('Connect to HR')}
                  disabled={isLoading || isConnectingHR}
                >
                  Connect to HR Partner
                </Button>
              </div>
            </div>
          ) : null}

          {canSubmit ? (
            <div className="border-t p-4 bg-gray-50">
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => sendMessage('Cancel')}>
                  Cancel
                </Button>
                <Button variant="outline" onClick={() => setShowSubmitDialog(true)}>
                  Submit Anonymously
                </Button>
                <Button onClick={() => setShowSubmitDialog(true)}>Submit Report</Button>
              </div>
            </div>
          ) : null}

          <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
        </Card>
      </div>

      {showSubmitDialog && (
        <SubmitReportDialog
          sessionId={sessionId}
          onCancel={() => setShowSubmitDialog(false)}
        />
      )}
    </div>
  );
}
