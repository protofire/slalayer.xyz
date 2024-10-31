import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ParticipationCardProps {
  redirectUrl: string;
  heading: string;
  highlightedText: string;
  description: string;
  accentColor: 'blue' | 'violet' | 'pink';
}

export default function ParticipationCard({
  redirectUrl,
  heading,
  highlightedText,
  description,
  accentColor = 'blue',
}: ParticipationCardProps) {
  const textColor = cn(
    accentColor === 'blue' && 'text-[#3B82F6]',
    accentColor === 'violet' && 'text-[#A83BF6]',
    accentColor === 'pink' && 'text-[#DB2777]',
  );

  const borderColor = cn(
    accentColor === 'blue' && 'border-[#3B82F6]',
    accentColor === 'violet' && 'border-[#A83BF6]',
    accentColor === 'pink' && 'border-[#DB2777]',
  );

  const hoverColor = cn(
    accentColor === 'blue' && 'hover:bg-[#004570]',
    accentColor === 'violet' && 'hover:bg-[#6D3EA3]',
    accentColor === 'pink' && 'hover:bg-[#9D174D]',
  );

  const focusRingColor = cn(
    accentColor === 'blue' && 'focus:ring-[#3B82F6]',
    accentColor === 'violet' && 'focus:ring-[#A83BF6]',
    accentColor === 'pink' && 'focus:ring-[#DB2777]',
  );

  return (
    <div className="bg-[#1B1F3A] text-white rounded-lg p-4 shadow-lg w-full max-w-xs flex flex-col items-center justify-between">
      <h2 className="text-base font-semibold text-center">
        {heading}{' '}
        <span className={cn('font-semibold', textColor)}>
          {highlightedText}
        </span>
      </h2>
      <p className="text-gray-400 mt-2 text-center text-xs">{description}</p>
      <Link
        href={redirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4"
      >
        <button
          className={cn(
            'px-4 py-1 text-xs rounded-full transition-colors border text-white focus:outline-none focus:ring-2 focus:ring-opacity-50',
            textColor,
            borderColor,
            hoverColor,
            focusRingColor,
          )}
        >
          Submit
        </button>
      </Link>
    </div>
  );
}
