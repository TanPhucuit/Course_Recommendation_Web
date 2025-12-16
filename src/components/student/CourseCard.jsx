import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Play, Star } from 'lucide-react';

const CourseCard = ({ course, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/course/${course.id}`)}
      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      {/* Image Wrapper */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"%3E%3Crect fill="%23f1f5f9" width="400" height="225"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="48"%3E📚%3C/text%3E%3C/svg%3E';
          }}
        />

        {/* Overlay Play Button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Play size={24} className="text-indigo-600" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-white/90 backdrop-blur-sm text-slate-900 shadow-sm">
            {course.category}
          </span>
        </div>

        {/* Rating Badge */}
        {course.rating && (
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-400/90 backdrop-blur-sm shadow-sm">
              <Star size={12} className="text-yellow-900" fill="currentColor" />
              <span className="text-xs font-bold text-yellow-900">{course.rating}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-slate-500 mb-3">
          {course.instructor}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{course.enrolledCount?.toLocaleString() || '0'}</span>
          </div>
        </div>

        {/* Progress Bar (if enrolled) */}
        {course.progress !== undefined && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-500">Tiến độ</span>
              <span className="font-bold text-indigo-600">{course.progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100">
              <div
                className="h-1.5 rounded-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer: Price or Action */}
        <div className="flex items-center justify-between">
          {course.price !== undefined ? (
            <span className="text-lg font-bold text-indigo-700">
              {course.price === 0 ? 'Miễn phí' : `${course.price.toLocaleString()}đ`}
            </span>
          ) : (
            <span className="text-sm font-semibold text-emerald-600">
              Đã đăng ký
            </span>
          )}

          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
            Xem chi tiết →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
