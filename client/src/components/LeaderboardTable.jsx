import React from 'react';
import { Trophy, Medal, User } from 'lucide-react';

const LeaderboardTable = ({ scores }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 0: return <Trophy className="w-6 h-6 text-amber-400" />;
      case 1: return <Medal className="w-6 h-6 text-slate-400" />;
      case 2: return <Medal className="w-6 h-6 text-amber-700" />;
      default: return <span className="text-slate-400 font-bold">{rank + 1}</span>;
    }
  };

  return (
    <div className="overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Rank</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Total Score</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Attempts</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {scores.map((score, index) => (
            <tr key={score._id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(index)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <User className="w-4 h-4 text-slate-500" />
                  </div>
                  <span className="font-bold text-slate-900">{score.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className="text-lg font-black text-primary-600">{score.totalScore}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-slate-500 font-medium">
                {score.attempts}
              </td>
            </tr>
          ))}
          {scores.length === 0 && (
            <tr>
              <td colSpan="4" className="px-6 py-12 text-center text-slate-500 font-medium">
                No scores yet. Be the first to top the charts!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
