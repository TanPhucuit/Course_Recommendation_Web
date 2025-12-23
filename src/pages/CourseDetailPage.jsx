import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCourseById } from '../data/mockData';
import { ArrowLeft, Play, FileText, Clock, User, School, ChevronDown, ChevronUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CourseDetailPage = () => {
  const { id } = useParams();
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState([]);

  // Load course data from CSV
  useEffect(() => {
    const loadCourse = async () => {
      setIsLoading(true);
      const courseData = await getCourseById(id);
      setCourse(courseData);
      setIsLoading(false);
    };

    loadCourse();
  }, [id]);

  const toggleChapter = (chapterId) => {
    if (expandedChapters.includes(chapterId)) {
      setExpandedChapters(expandedChapters.filter(id => id !== chapterId));
    } else {
      setExpandedChapters([...expandedChapters, chapterId]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Đang tải thông tin khóa học...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark mb-2">Không tìm thấy khóa học</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  // Data for charts (Admin view)
  const enrollmentData = [
    { name: 'Đã hoàn thành', value: course.completedCount, color: '#10B981' },
    { name: 'Đang học', value: course.enrolledCount - course.completedCount, color: '#F59E0B' }
  ];

  const progressData = [
    { name: 'Tuần 1', enrolled: 50, completed: 10 },
    { name: 'Tuần 2', enrolled: 80, completed: 20 },
    { name: 'Tuần 3', enrolled: 120, completed: 45 },
    { name: 'Tuần 4', enrolled: course.enrolledCount, completed: course.completedCount }
  ];

  return (
    <div className="min-h-screen bg-light">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Quay lại
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section - 20% */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-6 shadow-lg">
          <div className="flex gap-6">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-64 h-48 rounded-xl object-cover shadow-lg"
            />
            <div className="flex-1 text-white">
              <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-3">
                {course.category}
              </div>
              <h1 className="text-4xl font-black mb-4">{course.title}</h1>
              <p className="text-white/90 mb-6 text-lg">{course.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <School size={18} />
                    <span className="text-sm opacity-90">Trường</span>
                  </div>
                  <p className="font-semibold">{course.school}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <User size={18} />
                    <span className="text-sm opacity-90">Giảng viên</span>
                  </div>
                  <p className="font-semibold">{course.instructor}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={18} />
                    <span className="text-sm opacity-90">Thời gian</span>
                  </div>
                  <p className="font-semibold">{course.duration}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Play size={18} />
                    <span className="text-sm opacity-90">Video</span>
                  </div>
                  <p className="font-semibold">{course.videoCount} videos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - 80% */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* User View - Chapters and Lessons */}
          {!isAdmin && (
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                <FileText className="text-primary" />
                Nội dung khóa học
              </h2>

              {course.chapters && course.chapters.length > 0 ? (
                <div className="space-y-4">
                  {course.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
                    >
                      {/* Chapter Header */}
                      <div
                        onClick={() => toggleChapter(chapter.id)}
                        className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-500 to-cyan-500 cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <h3 className="font-bold text-white text-lg">{chapter.title || 'Chương học'}</h3>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-white/90">
                            {chapter.lessons?.length || 0} bài học
                          </span>
                          {expandedChapters.includes(chapter.id) ? (
                            <ChevronUp className="text-white" size={24} />
                          ) : (
                            <ChevronDown className="text-white/80" size={24} />
                          )}
                        </div>
                      </div>

                      {/* Lessons List */}
                      {expandedChapters.includes(chapter.id) && (
                        <div className="p-5 space-y-3">
                          {chapter.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-primary/30 hover:shadow-md transition-all group"
                            >
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                <Play size={20} className="text-primary group-hover:text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-dark group-hover:text-primary transition-colors">
                                  {lesson.title}
                                </h4>
                              </div>
                              <a
                                href={lesson.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                              >
                                Xem video
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-12">
                  Nội dung khóa học đang được cập nhật
                </p>
              )}
            </div>
          )}

          {/* Admin View - Statistics */}
          {isAdmin && (
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">Thống kê khóa học</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Pie Chart - Enrollment Status */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-dark mb-4 text-lg">Trạng thái học viên</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={enrollmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {enrollmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Stats Cards */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <p className="text-blue-100 mb-2">Tổng số đăng ký</p>
                    <p className="text-4xl font-bold">{course.enrolledCount}</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <p className="text-green-100 mb-2">Đã hoàn thành</p>
                    <p className="text-4xl font-bold">{course.completedCount}</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <p className="text-purple-100 mb-2">Tỷ lệ hoàn thành</p>
                    <p className="text-4xl font-bold">
                      {Math.round((course.completedCount / course.enrolledCount) * 100)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Bar Chart - Progress Over Time */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-dark mb-4 text-lg">Tiến độ theo thời gian</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="enrolled" fill="#4F46E5" name="Đăng ký" />
                    <Bar dataKey="completed" fill="#10B981" name="Hoàn thành" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
