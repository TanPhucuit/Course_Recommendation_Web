import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, MoreHorizontal, Edit, Trash2, Users } from 'lucide-react';

const CoursesTable = ({ courses }) => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const getStatusBadge = (enrolledCount) => {
    if (enrolledCount > 500) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
          Phổ biến
        </span>
      );
    } else if (enrolledCount > 200) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          Đang tăng
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
        Mới
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-900">Quản lý khóa học</h2>
        <p className="text-sm text-slate-500 mt-1">Tổng quan về tất cả khóa học trong hệ thống</p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="text-left py-3 px-6 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Khóa học
              </th>
              <th className="text-left py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Danh mục
              </th>
              <th className="text-left py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Giảng viên
              </th>
              <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Trạng thái
              </th>
              <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Đăng ký
              </th>
              <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Hoàn thành
              </th>
              <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Tỷ lệ
              </th>
              <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              const completionRate = course.enrolledCount > 0
                ? Math.round((course.completedCount / course.enrolledCount) * 100)
                : 0;

              return (
                <motion.tr
                  key={course.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="border-b border-slate-100 hover:bg-indigo-50/30 transition-colors duration-150"
                >
                  {/* Course Name with Thumbnail */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect fill="%23f1f5f9" width="40" height="40"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="16"%3E📚%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 text-sm truncate">
                          {course.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {course.duration}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700">
                      {course.category}
                    </span>
                  </td>

                  {/* Instructor */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                        {course.instructor.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <p className="text-sm text-slate-700 font-medium">
                        {course.instructor}
                      </p>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4 text-center">
                    {getStatusBadge(course.enrolledCount)}
                  </td>

                  {/* Enrolled Count */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Users size={14} className="text-slate-400" />
                      <span className="font-semibold text-slate-900 tabular-nums">
                        {course.enrolledCount}
                      </span>
                    </div>
                  </td>

                  {/* Completed Count */}
                  <td className="py-4 px-4 text-center">
                    <span className="font-semibold text-emerald-600 tabular-nums">
                      {course.completedCount}
                    </span>
                  </td>

                  {/* Completion Rate */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full max-w-[80px] bg-slate-100 rounded-full h-1.5">
                        <div
                          className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 tabular-nums">
                        {completionRate}%
                      </span>
                    </div>
                  </td>

                  {/* Actions Dropdown */}
                  <td className="py-4 px-4 text-center relative">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === course.id ? null : course.id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <MoreHorizontal size={18} className="text-slate-500" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === course.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setActiveDropdown(null)}
                        />
                        <div className="absolute right-4 top-12 z-20 w-48 bg-white rounded-lg border border-slate-200 shadow-lg py-1">
                          <button
                            onClick={() => {
                              navigate(`/course/${course.id}`);
                              setActiveDropdown(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Eye size={16} />
                            Xem chi tiết
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Edit size={16} />
                            Chỉnh sửa
                          </button>
                          <div className="border-t border-slate-100 my-1" />
                          <button
                            className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                          >
                            <Trash2 size={16} />
                            Xóa khóa học
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/30">
        <p className="text-sm text-slate-500">
          Hiển thị <span className="font-semibold text-slate-700">{courses.length}</span> khóa học
        </p>
      </div>
    </div>
  );
};

export default CoursesTable;
