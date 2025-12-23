import React from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Target } from 'lucide-react';

const GreetingSection = ({ user, currentCourse }) => {
  // Calculate real stats from user data
  const totalCourses = user?.enrolledCourses?.length || 0;
  const completedCourses = user?.completedCourses?.length || 0;
  const overallProgress = user?.progress?.overall || 0;

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
          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Xin chào, {user?.fullName || 'Học viên'}! 👋
            </h2>
            <p className="text-indigo-100 text-lg">
              Tiếp tục hành trình học tập của bạn hôm nay
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Stat 1: Total Courses */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <BookOpen className="text-white" size={20} />
                </div>
                <p className="text-xs text-white/70 uppercase tracking-wider">Khóa học</p>
              </div>
              <p className="text-4xl font-bold tabular-nums">{totalCourses}</p>
            </div>

            {/* Stat 2: Completed */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-400/30 flex items-center justify-center">
                  <Target className="text-emerald-200" size={20} />
                </div>
                <p className="text-xs text-white/70 uppercase tracking-wider">Hoàn thành</p>
              </div>
              <p className="text-4xl font-bold tabular-nums">{completedCourses}</p>
            </div>

            {/* Stat 3: Progress */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber-400/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                  </svg>
                </div>
                <p className="text-xs text-white/70 uppercase tracking-wider">Tiến độ</p>
              </div>
              <p className="text-4xl font-bold tabular-nums">{overallProgress}%</p>
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
