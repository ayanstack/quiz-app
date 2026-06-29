import React from 'react';
import { Clock } from 'lucide-react';

const CountdownTimer = ({ seconds }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getColorClass = () => {
    if (seconds > 30) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800/30';
    if (seconds > 10) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border-amber-100 dark:border-amber-800/30';
    return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 border-rose-100 dark:border-rose-800/30 animate-pulse';
  };

  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 font-mono font-bold text-lg shadow-sm transition-colors duration-300 ${getColorClass()}`}>
      <Clock className="w-5 h-5" />
      <span>{formatTime(seconds)}</span>
    </div>
  );
};

export default CountdownTimer;
