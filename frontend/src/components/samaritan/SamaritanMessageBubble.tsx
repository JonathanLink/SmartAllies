import { cn } from '@/utils/helpers';

interface SamaritanMessageBubbleProps {
  message: string;
  isUser: boolean;
  samaritanName?: string;
  samaritanImage?: string;
  timestamp: Date;
}

export function SamaritanMessageBubble({
  message,
  isUser,
  samaritanName,
  samaritanImage,
  timestamp,
}: SamaritanMessageBubbleProps) {
  return (
    <div className={cn('flex mb-4', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && samaritanImage && (
        <img
          src={samaritanImage}
          alt={samaritanName}
          className="w-8 h-8 rounded-full mr-3 object-cover border-2 border-red-200 shadow-sm flex-shrink-0"
        />
      )}
      <div className="flex flex-col max-w-[75%]">
        {!isUser && samaritanName && (
          <span className="text-xs font-semibold text-red-600 mb-1 ml-1">
            {samaritanName}
          </span>
        )}
        <div
          className={cn(
            'rounded-2xl px-5 py-3 shadow-md border backdrop-blur-sm',
            isUser
              ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg border-red-400/50'
              : 'bg-white/95 text-gray-900 border-red-100/70'
          )}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{message}</p>
          <span
            className={cn(
              'text-[11px] mt-2 block',
              isUser ? 'text-red-100' : 'text-gray-500'
            )}
          >
            {timestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>
      {isUser && <div className="w-8 ml-3" />}
    </div>
  );
}
