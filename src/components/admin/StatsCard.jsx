import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue,
  index = 0 
}) => {
  const isPositive = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center">
          <Icon className="text-slate-700" size={24} />
        </div>
        {trendValue && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive 
              ? 'bg-emerald-50 text-emerald-700' 
              : 'bg-rose-50 text-rose-700'
          }`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-3xl font-bold text-slate-900 mb-1 tabular-nums">
          {value}
        </p>
        <p className="text-sm text-slate-500 font-medium">
          {title}
        </p>
      </div>

      {/* Mini Sparkline Placeholder - Can be implemented with Recharts */}
      <div className="mt-4 h-8 flex items-end gap-1">
        {[40, 60, 45, 70, 55, 80, 65].map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-indigo-100 rounded-sm transition-all duration-300"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default StatsCard;
