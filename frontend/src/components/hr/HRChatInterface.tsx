import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HRMessageBubble } from './HRMessageBubble';
import { apiService } from '@/services/api.service';
import { cn } from '@/utils/helpers';
import type { HRSession } from '@/types/hr.types';
import type { ChatMessage } from '@/types/incident.types';
import { Send } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface HRChatInterfaceProps {
  sessionId: string;
  hrSession: HRSession;
  initialMessage?: string;
  previousMessages?: ChatMessage[];
}

export function HRChatInterface({ 
  sessionId, 
  hrSession, 
  initialMessage,
  previousMessages = []
}: HRChatInterfaceProps) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hrMessages: Message[] = [];
    
    if (initialMessage) {
      hrMessages.push({
        text: initialMessage,
        isUser: false,
        timestamp: new Date(),
      });
    }
    
    setMessages(hrMessages);
  }, [initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || sessionEnded) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    setMessages((prev) => [
      ...prev,
      { text: userMessage, isUser: true, timestamp: new Date() },
    ]);

    setIsLoading(true);

    try {
      const response = await apiService.sendHRMessage({
        sessionId,
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { text: response.message, isUser: false, timestamp: new Date() },
      ]);

      if (response.sessionEnded && response.ticketId) {
        setSessionEnded(true);
        setTimeout(() => {
          navigate(`/report/${response.ticketId}`);
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to send HR message:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, there was an error. Please try again.',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          {hrSession.hrPartnerImage && (
            <img
              src={hrSession.hrPartnerImage}
              alt={hrSession.hrPartnerName}
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
          )}
          <div>
            <h1 className="text-xl font-semibold">HR Partner: {hrSession.hrPartnerName}</h1>
            <p className="text-sm text-white/80">Confidential Conversation</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <Card className="flex-1 flex flex-col m-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            {previousMessages.length > 0 && (
              <>
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs text-gray-500 mb-3 text-center">Previous Conversation</p>
                  {previousMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        'flex mb-4',
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] rounded-lg px-4 py-2',
                          msg.role === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-900'
                        )}
                      >
                        {msg.imageUrl && (
                          <img
                            src={msg.imageUrl}
                            alt="Attached"
                            className="mb-2 rounded max-w-full h-auto"
                          />
                        )}
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 text-center bg-blue-50 py-2 rounded">
                    Now connected with HR Partner: {hrSession.hrPartnerName}
                  </p>
                </div>
              </>
            )}
            
            {messages.map((msg, index) => (
              <HRMessageBubble
                key={index}
                message={msg.text}
                isUser={msg.isUser}
                hrPartnerName={!msg.isUser ? hrSession.hrPartnerName : undefined}
                hrPartnerImage={!msg.isUser ? hrSession.hrPartnerImage : undefined}
                timestamp={msg.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {sessionEnded && (
            <div className="bg-green-50 border-t border-green-200 p-4">
              <p className="text-green-800 text-center">
                Session ended. Redirecting to your ticket...
              </p>
            </div>
          )}

          {!sessionEnded && (
            <div className="border-t p-4 bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading || sessionEnded}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim() || sessionEnded}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
