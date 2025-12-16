import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import StatsCard from '../components/admin/StatsCard';
import CoursesTable from '../components/admin/CoursesTable';
import { mockCourses, mockAdminLogs } from '../data/mockData';
import { BookOpen, Users, TrendingUp, Award } from 'lucide-react';

const AdminDashboard = () => {
  // Calculate statistics
  const totalCourses = mockCourses.length;
  const totalEnrolled = mockCourses.reduce((sum, c) => sum + c.enrolledCount, 0);
  const totalCompleted = mockCourses.reduce((sum, c) => sum + c.completedCount, 0);
  const avgCompletionRate = totalEnrolled > 0 
    ? Math.round((totalCompleted / totalEnrolled) * 100) 
    : 0;

  const statsData = [
    {
      title: 'Tổng khóa học',
      value: totalCourses,
      icon: BookOpen,
      trend: 'up',
      trendValue: '+12%'
    },
    {
      title: 'Lượt đăng ký',
      value: totalEnrolled.toLocaleString(),
      icon: Users,
      trend: 'up',
      trendValue: '+23%'
    },
    {
      title: 'Đã hoàn thành',
      value: totalCompleted.toLocaleString(),
      icon: Award,
      trend: 'up',
      trendValue: '+8%'
    },
    {
      title: 'Tỷ lệ hoàn thành',
      value: `${avgCompletionRate}%`,
      icon: TrendingUp,
      trend: 'up',
      trendValue: '+5%'
    }
  ];

  return (
    <DashboardLayout notifications={mockAdminLogs}>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Tổng quan hệ thống
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Thống kê và quản lý toàn bộ khóa học
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              trendValue={stat.trendValue}
              index={index}
            />
          ))}
        </div>

        {/* Courses Table */}
        <CoursesTable courses={mockCourses} />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
