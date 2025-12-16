import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Flame, Trophy } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for activity chart
const ACTIVITY_DATA = [
  { day: 'T2', hours: 2 },
  { day: 'T3', hours: 4.5 },
  { day: 'T4', hours: 1.5 },
  { day: 'T5', hours: 5 },
  { day: 'T6', hours: 3 },
  { day: 'T7', hours: 6 },
  { day: 'CN', hours: 4 },
];

// Custom Tooltip for Chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
        <p className="font-bold">{payload[0].payload.day}</p>
        <p className="tabular-nums">{payload[0].value} giờ học</p>
      </div>
    );
  }
  return null;
};

const GreetingSection = ({ user, currentCourse }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Hero Banner - Dashboard Mini */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-8 text-white relative overflow-hidden"
      >
        {/* Decorative Gradient Orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-violet-400/20 rounded-full blur-2xl" />

        <div className="relative z-10">
          {/* 2 Column Grid: Stats (40%) + Chart (60%) */}
          <div className="grid grid-cols-5 gap-8">
            {/* Left Column - Key Metrics */}
            <div className="col-span-2 space-y-6">
              {/* Section Title */}
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-4">
                  Tổng quan hiệu suất
                </p>
              </div>

              {/* Metric 1: Weekly Streak */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Flame className="text-orange-300" size={24} />
                  </div>
                  <div>
                    <p className="text-4xl font-bold tabular-nums">12</p>
                    <p className="text-xs text-white/70">Ngày liên tiếp</p>
                  </div>
                </div>
              </div>

              {/* Metric 2: Hours Spent */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Clock className="text-blue-300" size={24} />
                  </div>
                  <div>
                    <p className="text-4xl font-bold tabular-nums">24.5</p>
                    <p className="text-xs text-white/70">Giờ học tuần này</p>
                  </div>
                </div>
              </div>

              {/* Metric 3: Completion */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Trophy className="text-amber-300" size={24} />
                  </div>
                  <div>
                    <p className="text-4xl font-bold tabular-nums">8/10</p>
                    <p className="text-xs text-white/70">Bài học đã xong</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Learning Activity Chart */}
            <div className="col-span-3">
              <div className="mb-3">
                <h3 className="text-white/90 font-bold text-lg">Hoạt động học tập</h3>
                <p className="text-white/60 text-xs">7 ngày qua</p>
              </div>
              
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ACTIVITY_DATA}>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                    <Bar 
                      dataKey="hours" 
                      fill="rgba(255, 255, 255, 0.8)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Resume Learning Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-xl shadow-indigo-200/50 -mt-6"
      >
        <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
          Tiếp tục học tập
        </h3>

        {currentCourse ? (
          <div className="space-y-4">
            {/* Course Thumbnail */}
            <div className="aspect-video rounded-lg overflow-hidden bg-slate-100">
              <img
                src={currentCourse.thumbnail}
                alt={currentCourse.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Course Info */}
            <div>
              <h4 className="font-bold text-slate-900 mb-1 line-clamp-2">
                {currentCourse.title}
              </h4>
              <p className="text-sm text-slate-500">
                Bài 5: {currentCourse.currentLesson || 'Component Lifecycle'}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Tiến độ</span>
                <span className="font-bold text-indigo-600">65%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-indigo-600 transition-all duration-500"
                  style={{ width: '65%' }}
                />
              </div>
            </div>

            {/* Play Button */}
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md group">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={16} fill="currentColor" />
              </div>
              Tiếp tục học
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">Chưa có bài học nào đang học</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GreetingSection;
