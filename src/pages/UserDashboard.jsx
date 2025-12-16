import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import GreetingSection from '../components/student/GreetingSection';
import CourseCard from '../components/student/CourseCard';
import { mockNotifications, mockCourses, getAISuggestedCourses, getRelatedCourses } from '../data/mockData';
import { BarChart3, Lightbulb, BookOpen, Search, Sparkles, CheckCircle, Target } from 'lucide-react';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');
  const [aiSuggested, setAiSuggested] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAISuggest = () => {
    const suggested = getAISuggestedCourses(currentUser.id);
    setAiSuggested(suggested);
  };

  const enrolledCourses = mockCourses.filter(c =>
    currentUser.enrolledCourses.includes(c.id)
  ).map(c => ({
    ...c,
    progress: currentUser.progress.courses[c.id] || 0
  }));

  // Sử dụng helper function mới để lấy các khóa học cùng chủ đề
  const relatedCourses = getRelatedCourses(currentUser.enrolledCourses);

  const filteredCourses = relatedCourses.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current course for Resume Learning
  const currentCourse = enrolledCourses.find(c => c.progress > 0 && c.progress < 100) || enrolledCourses[0];

  return (
    <DashboardLayout notifications={mockNotifications}>
      <div className="space-y-6">
        {/* Greeting & Resume Learning Section */}
        <GreetingSection user={currentUser} currentCourse={currentCourse} />

        {/* Tabs Navigation */}
        <div className="flex gap-2 border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm transition-all duration-200 border-b-2 ${
              activeTab === 'courses'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <BookOpen size={18} />
            Khóa học của tôi
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm transition-all duration-200 border-b-2 ${
              activeTab === 'stats'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <BarChart3 size={18} />
            Thống kê
          </button>
          <button
            onClick={() => setActiveTab('suggest')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm transition-all duration-200 border-b-2 ${
              activeTab === 'suggest'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Sparkles size={18} />
            Đề xuất khóa học
          </button>
          <button
            onClick={() => setActiveTab('related')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm transition-all duration-200 border-b-2 ${
              activeTab === 'related'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Target size={18} />
            Các khóa học cùng chủ đề
          </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {/* My Courses Tab */}
          {activeTab === 'courses' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Khóa học đã đăng ký</h2>
                <p className="text-sm text-slate-500">
                  {enrolledCourses.length} khóa học • {currentUser.completedCourses.length} đã hoàn thành
                </p>
              </div>

              {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {enrolledCourses.map((course, index) => (
                    <CourseCard key={course.id} course={course} index={index} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <BookOpen className="mx-auto text-slate-300 mb-4" size={64} />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Chưa có khóa học nào</h3>
                  <p className="text-slate-500 mb-6">Hãy khám phá và đăng ký khóa học phù hợp với bạn</p>
                  <button
                    onClick={() => setActiveTab('related')}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Khám phá khóa học
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Tổng quan học tập</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-indigo-50 p-6 rounded-xl text-center border border-indigo-100">
                    <p className="text-4xl font-extrabold text-indigo-600 mb-2 tabular-nums">{currentUser.enrolledCourses.length}</p>
                    <p className="text-sm text-slate-600 font-medium">Khóa đã đăng ký</p>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-xl text-center border border-emerald-100">
                    <p className="text-4xl font-extrabold text-emerald-600 mb-2 tabular-nums">{currentUser.completedCourses.length}</p>
                    <p className="text-sm text-slate-600 font-medium">Khóa hoàn thành</p>
                  </div>
                  <div className="bg-amber-50 p-6 rounded-xl text-center border border-amber-100">
                    <p className="text-4xl font-extrabold text-amber-600 mb-2 tabular-nums">{currentUser.progress.overall}%</p>
                    <p className="text-sm text-slate-600 font-medium">Tiến độ tổng thể</p>
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 mb-4">Tiến độ từng khóa học</h4>
                <div className="space-y-3">
                  {enrolledCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-slate-50 p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-slate-900 text-sm">{course.title}</h5>
                        <span className="text-sm font-bold text-indigo-600 tabular-nums">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      {course.progress === 100 && (
                        <div className="flex items-center gap-1 text-emerald-600 text-xs mt-2 font-medium">
                          <CheckCircle size={14} />
                          <span>Đã hoàn thành</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Suggest Tab */}
          {activeTab === 'suggest' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Đề xuất bằng AI</h3>
                    <p className="text-sm text-slate-500 mt-1">Khóa học phù hợp với sở thích và mục tiêu của bạn</p>
                  </div>
                  <button
                    onClick={handleAISuggest}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 text-sm"
                  >
                    <Sparkles size={18} />
                    Phân tích AI
                  </button>
                </div>

                {aiSuggested.length > 0 ? (
                  <div>
                    <div className="flex items-center gap-2 mb-6 p-4 bg-purple-50 border border-purple-100 rounded-lg">
                      <Sparkles className="text-purple-600" size={20} />
                      <p className="text-sm text-purple-900 font-medium">
                        AI đã phân tích và tìm thấy <span className="font-bold">{aiSuggested.length} khóa học</span> phù hợp với bạn
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                      {aiSuggested.map((course, index) => (
                        <CourseCard key={course.id} course={course} index={index} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Sparkles className="mx-auto text-slate-300 mb-4" size={64} />
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Khám phá khóa học phù hợp</h4>
                    <p className="text-slate-500 mb-6">Nhấn nút "Phân tích AI" để nhận gợi ý khóa học dành riêng cho bạn</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Related Courses Tab */}
          {activeTab === 'related' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Các khóa học cùng chủ đề</h3>
                  <p className="text-sm text-slate-500">Khóa học cùng chủ đề với những gì bạn đang học</p>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm khóa học..."
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all text-sm bg-slate-50 focus:bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map((course, index) => (
                      <CourseCard key={course.id} course={course} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <BookOpen className="mx-auto text-slate-300 mb-4" size={64} />
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Không tìm thấy khóa học</h4>
                    <p className="text-slate-500">Thử tìm kiếm với từ khóa khác</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
