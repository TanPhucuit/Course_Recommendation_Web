import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import GreetingSection from '../components/student/GreetingSection';
import CourseCard from '../components/student/CourseCard';
import { mockNotifications, getCourseById } from '../data/mockData';
import { BarChart3, Lightbulb, BookOpen, CheckCircle } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dataLoader from '../services/dataLoader';
import aiRecommendation from '../services/aiRecommendation';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [lastRecommendedUserId, setLastRecommendedUserId] = useState(null);

  useEffect(() => {
    const loadEnrolledCourses = async () => {
      if (!currentUser || !currentUser.enrolledCourses) {
        setEnrolledCourses([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      dataLoader.clearCache();
      
      const coursesPromises = currentUser.enrolledCourses.map(async (courseId) => {
        const course = await getCourseById(courseId);
        if (course) {
          return {
            ...course,
            progress: currentUser.progress.courses[courseId] || 0
          };
        }
        return null;
      });

      const courses = await Promise.all(coursesPromises);
      setEnrolledCourses(courses.filter(c => c !== null));
      setIsLoading(false);
    };

    loadEnrolledCourses();
  }, [currentUser]);

  // Load AI recommendations when switching to suggestions tab
  useEffect(() => {
    const loadRecommendations = async () => {
      console.log('[Dashboard] useEffect triggered:', {
        activeTab,
        hasCurrentUser: !!currentUser,
        currentUserId: currentUser?.id,
        lastRecommendedUserId,
        recommendedCoursesLength: recommendedCourses.length
      });

      // Check if user changed - if yes, clear recommendations
      if (currentUser && lastRecommendedUserId !== currentUser.id) {
        console.log('[Dashboard] User changed, clearing recommendations');
        setRecommendedCourses([]);
        setLastRecommendedUserId(null);
      }

      if (activeTab === 'suggestions' && currentUser && lastRecommendedUserId !== currentUser.id) {
        console.log('[Dashboard] Loading recommendations for new user:', currentUser.id);
        setIsLoadingRecommendations(true);
        
        const courseIds = await aiRecommendation.getRecommendations(currentUser.id);
        console.log('[Dashboard] Received course IDs:', courseIds);
        
        // Add "C_" prefix to course IDs if they are numbers
        const formattedCourseIds = courseIds.map(id => {
          const courseId = typeof id === 'number' ? `C_${id}` : (id.startsWith('C_') ? id : `C_${id}`);
          console.log(`[Dashboard] Formatted ${id} -> ${courseId}`);
          return courseId;
        });
        
        const coursesPromises = formattedCourseIds.map(async (courseId) => {
          const course = await getCourseById(courseId);
          console.log(`[Dashboard] Loaded course ${courseId}:`, course ? course.title : 'NOT FOUND');
          return course;
        });
        
        const courses = await Promise.all(coursesPromises);
        const validCourses = courses.filter(c => c !== null);
        
        console.log(`[Dashboard] Setting ${validCourses.length} recommended courses for user ${currentUser.id}`);
        setRecommendedCourses(validCourses);
        setLastRecommendedUserId(currentUser.id);
        setIsLoadingRecommendations(false);
      } else {
        console.log('[Dashboard] Skipping recommendation load:', {
          wrongTab: activeTab !== 'suggestions',
          noUser: !currentUser,
          sameUser: lastRecommendedUserId === currentUser?.id
        });
      }
    };

    loadRecommendations();
  }, [activeTab, currentUser?.id]);

  const currentCourse = enrolledCourses.find(c => c.progress > 0 && c.progress < 100) || enrolledCourses[0];

  const totalChapters = enrolledCourses.reduce((sum, course) => {
    return sum + (course.chapters?.reduce((chapterSum, chapter) => chapterSum + (chapter.lessons?.length || 0), 0) || 0);
  }, 0);

  const chapterComparisonData = enrolledCourses.map(course => ({
    name: course.title.length > 20 ? course.title.substring(0, 20) + '...' : course.title,
    chapters: course.chapters?.reduce((sum, chapter) => sum + (chapter.lessons?.length || 0), 0) || 0,
    courseId: course.id
  }));

  const completedCount = enrolledCourses.filter(c => c.progress >= 100).length;
  const inProgressCount = enrolledCourses.length - completedCount;
  const completionPieData = [
    { name: 'Đã hoàn thành', value: completedCount, color: '#10B981' },
    { name: 'Đang học', value: inProgressCount, color: '#F59E0B' }
  ];

  // Data for Progress Bar Chart (Biểu đồ 3)
  const progressBarData = enrolledCourses.map(course => ({
    name: course.title.length > 15 ? course.title.substring(0, 15) + '...' : course.title,
    completed: course.progress,
    remaining: 100 - course.progress
  }));

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
            onClick={() => setActiveTab('suggestions')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm transition-all duration-200 border-b-2 ${
              activeTab === 'suggestions'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Lightbulb size={18} />
            Đề xuất khóa học
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
                <h2 className="text-xl font-bold text-slate-900 mb-2">Khóa học đang học</h2>
                <p className="text-sm text-slate-500">
                  {enrolledCourses.length} khóa học • {currentUser.completedCourses.length} đã hoàn thành
                </p>
              </div>

              {isLoading ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <p className="text-slate-500">Đang tải khóa học...</p>
                </div>
              ) : enrolledCourses.length > 0 ? (
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
                    onClick={() => setActiveTab('suggestions')}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Xem đề xuất AI
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
              {isLoading ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <p className="text-slate-500">Đang tải thống kê...</p>
                </div>
              ) : (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border-2 border-indigo-200">
                      <p className="text-indigo-700 font-semibold mb-2 text-sm">Tổng số khóa học</p>
                      <p className="text-4xl font-extrabold text-indigo-600 tabular-nums">{enrolledCourses.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border-2 border-emerald-200">
                      <p className="text-emerald-700 font-semibold mb-2 text-sm">Đã hoàn thành</p>
                      <p className="text-4xl font-extrabold text-emerald-600 tabular-nums">{completedCount}</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border-2 border-amber-200">
                      <p className="text-amber-700 font-semibold mb-2 text-sm">Tổng số chapters</p>
                      <p className="text-4xl font-extrabold text-amber-600 tabular-nums">{totalChapters}</p>
                    </div>
                    <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-6 rounded-xl border-2 border-violet-200">
                      <p className="text-violet-700 font-semibold mb-2 text-sm">Tiến độ tổng thể</p>
                      <p className="text-4xl font-extrabold text-violet-600 tabular-nums">{currentUser.progress.overall}%</p>
                    </div>
                  </div>

                  {/* Chart 1: So sánh số lượng chapters */}
                  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <BarChart3 className="text-indigo-600" size={20} />
                      So sánh số lượng chapters giữa các khóa học
                    </h3>
                    {chapterComparisonData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chapterComparisonData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                          <XAxis 
                            dataKey="name" 
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E2E8F0',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="chapters" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-slate-500 text-center py-12">Chưa có dữ liệu</p>
                    )}
                  </div>

                  {/* Chart 2 & 3: Side by side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Chart 2: Biểu đồ tròn mức độ hoàn thành */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Mức độ hoàn thành khóa học</h3>
                      {enrolledCourses.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={completionPieData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {completionPieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <p className="text-slate-500 text-center py-12">Chưa có dữ liệu</p>
                      )}
                    </div>

                    {/* Chart 3: Phần trăm hoàn thành từng khóa học */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Tiến độ từng khóa học</h3>
                      {progressBarData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart 
                            data={progressBarData}
                            layout="vertical"
                            margin={{ left: 100 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis 
                              type="category" 
                              dataKey="name"
                              width={100}
                              tick={{ fontSize: 11 }}
                            />
                            <Tooltip />
                            <Bar dataKey="completed" stackId="a" fill="#10B981" name="Đã hoàn thành" />
                            <Bar dataKey="remaining" stackId="a" fill="#E2E8F0" name="Chưa hoàn thành" />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <p className="text-slate-500 text-center py-12">Chưa có dữ liệu</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* AI Suggest Tab */}
          {activeTab === 'suggestions' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Đề xuất bằng AI</h3>
                  <p className="text-sm text-slate-500 mt-1">Khóa học phù hợp với sở thích và mục tiêu của bạn</p>
                </div>

                {isLoadingRecommendations ? (
                  <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-slate-500">Đang tải gợi ý từ AI...</p>
                  </div>
                ) : recommendedCourses.length > 0 ? (
                  <div>
                    <div className="flex items-center gap-2 mb-6 p-4 bg-purple-50 border border-purple-100 rounded-lg">
                      <Lightbulb className="text-purple-600" size={20} />
                      <p className="text-sm text-purple-900 font-medium">
                        AI đã tìm thấy <span className="font-bold">{recommendedCourses.length} khóa học</span> phù hợp với bạn
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                      {recommendedCourses.map((course, index) => (
                        <CourseCard key={course.id} course={course} index={index} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Lightbulb className="mx-auto text-slate-300 mb-4" size={64} />
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Không có gợi ý</h4>
                    <p className="text-slate-500">Chưa có khóa học phù hợp được đề xuất</p>
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
