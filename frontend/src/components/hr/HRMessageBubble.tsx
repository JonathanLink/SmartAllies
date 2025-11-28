import { cn } from '@/utils/helpers';

interface HRMessageBubbleProps {
  message: string;
  isUser: boolean;
  hrPartnerName?: string;
  hrPartnerImage?: string;
  timestamp?: Date;
}

export function HRMessageBubble({
  message,
  isUser,
  hrPartnerName,
  hrPartnerImage,
  timestamp,
}: HRMessageBubbleProps) {
  return (
    <div className={cn('flex gap-3 mb-4', isUser ? 'flex-row-reverse' : '')}>
      {!isUser && hrPartnerImage && (
        <div className="flex-shrink-0">
          <img
            src={hrPartnerImage}
            alt={hrPartnerName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      )}

      <div className={cn('flex flex-col', isUser ? 'items-end' : 'items-start')}>
        {!isUser && hrPartnerName && (
          <p className="text-sm font-medium text-gray-700 mb-1">{hrPartnerName}</p>
        )}
        
        <div
          className={cn(
            'px-4 py-2 rounded-lg max-w-md',
            isUser
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-900'
          )}
        >
          <p className="whitespace-pre-wrap">{message}</p>
        </div>

        {timestamp && (
          <p className="text-xs text-gray-500 mt-1">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">You</span>
          </div>
        </div>
      )}
    </div>
  );
}
