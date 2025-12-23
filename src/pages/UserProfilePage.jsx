import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, School, Calendar, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const UserProfilePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy thông tin người dùng</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Quay lại Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Quay lại Dashboard
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Header Section with Avatar */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-12">
            <div className="flex items-center gap-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                  <UserCircle className="text-white" size={20} />
                </div>
              </motion.div>
              
              <div className="flex-1 text-white">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold mb-2"
                >
                  {currentUser.fullName}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-indigo-100 text-lg"
                >
                  {currentUser.role === 'admin' ? 'Quản trị viên' : 'Học viên'}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-3 inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                >
                  ID: {currentUser.id || currentUser.username}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <User className="text-indigo-600" size={24} />
              Thông tin cá nhân
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <User className="text-indigo-600" size={20} />
                  </div>
                  <h3 className="font-semibold text-slate-700 text-sm">Họ và tên</h3>
                </div>
                <p className="text-slate-900 font-bold text-lg ml-13">
                  {currentUser.fullName || 'Chưa cập nhật'}
                </p>
              </motion.div>

              {/* Gender */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                    <UserCircle className="text-violet-600" size={20} />
                  </div>
                  <h3 className="font-semibold text-slate-700 text-sm">Giới tính</h3>
                </div>
                <p className="text-slate-900 font-bold text-lg ml-13">
                  {currentUser.gender || 'Không xác định'}
                </p>
              </motion.div>

              {/* School */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <School className="text-emerald-600" size={20} />
                  </div>
                  <h3 className="font-semibold text-slate-700 text-sm">Trường học</h3>
                </div>
                <p className="text-slate-900 font-bold text-lg ml-13">
                  {currentUser.school || 'Chưa cập nhật'}
                </p>
              </motion.div>

              {/* Year of Birth */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Calendar className="text-amber-600" size={20} />
                  </div>
                  <h3 className="font-semibold text-slate-700 text-sm">Năm sinh</h3>
                </div>
                <p className="text-slate-900 font-bold text-lg ml-13">
                  {currentUser.yearOfBirth || 'Chưa cập nhật'}
                </p>
              </motion.div>
            </div>

            {/* Learning Stats */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Thống kê học tập</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 }}
                  className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border-2 border-indigo-200"
                >
                  <p className="text-indigo-700 font-semibold mb-2">Khóa đang học</p>
                  <p className="text-4xl font-extrabold text-indigo-600 tabular-nums">
                    {currentUser.enrolledCourses?.length || 0}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 }}
                  className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border-2 border-emerald-200"
                >
                  <p className="text-emerald-700 font-semibold mb-2">Đã hoàn thành</p>
                  <p className="text-4xl font-extrabold text-emerald-600 tabular-nums">
                    {currentUser.completedCourses?.length || 0}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border-2 border-amber-200"
                >
                  <p className="text-amber-700 font-semibold mb-2">Tiến độ tổng thể</p>
                  <p className="text-4xl font-extrabold text-amber-600 tabular-nums">
                    {currentUser.progress?.overall || 0}%
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Quay lại Dashboard
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfilePage;
