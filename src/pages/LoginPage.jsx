import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { companyInfo, teamInfo } from '../data/mockData';
import { FEATURED_COURSES, LEARNING_PATH, TESTIMONIALS } from '../data/landingData';
import { GraduationCap, MapPin, Phone, Mail, HelpCircle, User, Lock, ArrowRight, BookOpen, Users, Award, X, Star, Play, TrendingUp } from 'lucide-react';
import FAQModal from '../components/FAQModal';
import AnimatedCounter from '../components/CountingNumber';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = login(formData.username, formData.password);
      if (result.success) {
        if (result.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(result.message);
      }
    } else {
      if (!formData.fullName || !formData.email) {
        setError('Vui lòng điền đầy đủ thông tin');
        return;
      }
      const result = register(formData);
      if (result.success) {
        navigate('/dashboard');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 relative overflow-x-hidden">
      {/* Stylized Ocean Waves Background - Enhanced Visibility */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-[600px]" 
        style={{ zIndex: 0 }}
        preserveAspectRatio="none"
        viewBox="0 0 1440 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wave Layer 1 (Back) - Deep Indigo */}
        <motion.path
          d="M0,320 C320,280 640,360 960,320 C1280,280 1440,320 1440,320 L1440,600 L0,600 Z"
          fill="rgb(165, 180, 252)"
          initial={{ x: -100 }}
          animate={{ x: [0, 100, 0] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Wave Layer 2 (Middle) - Vibrant Blue */}
        <motion.path
          d="M0,380 C360,340 720,420 1080,380 C1320,350 1440,380 1440,380 L1440,600 L0,600 Z"
          fill="rgb(147, 197, 253)"
          initial={{ x: 100 }}
          animate={{ x: [0, -80, 0] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Wave Layer 3 (Front) - Cyan Accent */}
        <motion.path
          d="M0,450 C300,410 600,490 900,450 C1200,410 1440,450 1440,450 L1440,600 L0,600 Z"
          fill="rgb(186, 230, 253)"
          fillOpacity="0.9"
          initial={{ x: -50 }}
          animate={{ x: [0, 60, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </svg>

      {/* Top Left - Logo and Brand */}
      <div className="absolute top-8 left-8 z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-slate-200 shadow-sm"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-sm">
            <GraduationCap className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-slate-900">MOOC</span>
              <span className="text-indigo-600">CUBE</span>
            </h1>
            <p className="text-xs text-slate-500">Hệ thống quản lý học tập</p>
          </div>
        </motion.div>
      </div>

      {/* Top Right - Login Button */}
      <div className="absolute top-8 right-8 z-50">
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowLoginModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all duration-200 font-semibold shadow-sm cursor-pointer"
        >
          <User size={18} />
          <span>Đăng nhập</span>
        </motion.button>
      </div>

      {/* Bottom Left - Contact Info */}
      <div className="absolute bottom-8 left-8 z-10">
        <div className="bg-white/60 backdrop-blur-sm px-6 py-5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 max-w-sm">
          <h3 className="font-bold text-slate-900 mb-3 text-base tracking-tight">Thông tin liên hệ</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="text-slate-900 flex-shrink-0 mt-0.5" size={16} />
              <p className="text-slate-500">{companyInfo.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-slate-900 flex-shrink-0" size={16} />
              <p className="text-slate-500">{companyInfo.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-slate-900 flex-shrink-0" size={16} />
              <p className="text-slate-500">{companyInfo.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right - FAQ Button */}
      <div className="absolute bottom-8 right-8 z-10">
        <button
          onClick={() => setShowFAQ(true)}
          className="bg-white/60 backdrop-blur-sm px-6 py-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-all duration-200 border border-slate-200/60 flex items-center gap-3 group"
        >
          <HelpCircle className="text-slate-900 group-hover:scale-110 transition-transform" size={20} />
          <div className="text-left">
            <p className="font-semibold text-slate-900 text-sm">Vấn đề thường gặp</p>
            <p className="text-xs text-slate-500">Nhấn để xem FAQ</p>
          </div>
        </button>
      </div>

      {/* Hero Section - Center */}
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
            className="text-6xl font-extrabold mb-6 tracking-tight leading-tight text-slate-900"
          >
            Nền tảng học tập{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
              Thông minh & Hiện đại
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.1 }}
            className="text-lg text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Hệ thống quản lý khóa học với AI đề xuất khóa học phù hợp, 
            giúp bạn học tập hiệu quả và đạt được mục tiêu nghề nghiệp.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.2 }}
            className="flex gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            >
              Bắt đầu học ngay
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-lg transition-all duration-300 font-semibold text-lg shadow-sm hover:shadow-lg border border-slate-200 hover:border-indigo-300"
            >
              <Users size={20} />
              Về chúng tôi
            </motion.button>
          </motion.div>

          {/* Stats - Glassmorphism Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.3 }}
            className="grid grid-cols-3 gap-6 mt-20 max-w-3xl mx-auto relative"
          >
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white/60 backdrop-blur-md p-8 rounded-lg border border-white/50 border-b-4 border-b-indigo-500 hover:border-b-indigo-600 shadow-sm transition-all duration-300 group"
            >
              <div className="relative">
                <AnimatedCounter 
                  value="500+" 
                  className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-violet-600 mb-2 tabular-nums block"
                />
                <p className="text-slate-700 font-semibold text-sm uppercase tracking-wider">Khóa học</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white/60 backdrop-blur-md p-8 rounded-lg border border-white/50 border-b-4 border-b-indigo-500 hover:border-b-indigo-600 shadow-sm transition-all duration-300 group"
            >
              <div className="relative">
                <AnimatedCounter 
                  value="10K+" 
                  className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-violet-600 mb-2 tabular-nums block"
                />
                <p className="text-slate-700 font-semibold text-sm uppercase tracking-wider">Học viên</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white/60 backdrop-blur-md p-8 rounded-lg border border-white/50 border-b-4 border-b-indigo-500 hover:border-b-indigo-600 shadow-sm transition-all duration-300 group"
            >
              <div className="relative">
                <AnimatedCounter 
                  value="95%" 
                  className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-violet-600 mb-2 tabular-nums block"
                />
                <p className="text-slate-700 font-semibold text-sm uppercase tracking-wider">Hài lòng</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md border border-slate-200 relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-600" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                    {isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {isLogin ? 'Chào mừng bạn quay trở lại' : 'Tạo tài khoản mới để bắt đầu học tập'}
                  </p>
                </div>

                {/* Tab Switch */}
                <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(true);
                      setError('');
                    }}
                    className={`flex-1 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
                      isLogin
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Đăng nhập
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(false);
                      setError('');
                    }}
                    className={`flex-1 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
                      !isLogin
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Đăng ký
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tên đăng nhập
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all text-sm"
                        placeholder="Nhập tên đăng nhập"
                        required
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all text-sm"
                          placeholder="Nhập họ và tên"
                          required={!isLogin}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all text-sm"
                          placeholder="Nhập email"
                          required={!isLogin}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all text-sm"
                        placeholder="Nhập mật khẩu"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full btn-primary py-3 font-semibold"
                  >
                    {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                  </button>

                  {isLogin && (
                    <div className="text-center text-sm text-slate-600 mt-4 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                      <p className="font-semibold text-slate-900 mb-2">Tài khoản demo:</p>
                      <div className="space-y-1 text-xs">
                        <p>Học viên: <span className="font-mono font-semibold text-indigo-700">student1</span> / <span className="font-mono">123456</span></p>
                        <p>Quản trị: <span className="font-mono font-semibold text-indigo-700">admin</span> / <span className="font-mono">admin123</span></p>
                      </div>
                    </div>
                  )}
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Featured Courses Section */}
      <div className="relative z-10 bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.1 }}
              className="text-5xl font-extrabold mb-3 tracking-tight"
            >
              <span className="text-slate-900">Khóa học </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">Nổi bật</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.2 }}
              className="text-lg text-slate-500"
            >
              Được yêu thích nhất bởi cộng đồng học viên
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_COURSES.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-slate-100"><svg class="text-slate-300" width="48" height="48" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg></div>';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded shadow-sm border border-slate-100">
                      {course.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">Giảng viên: {course.instructor}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="font-semibold text-slate-900">{course.rating}</span>
                    </div>
                    <div className="text-slate-500">
                      {course.students.toLocaleString()} học viên
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-slate-900">{course.price}</span>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-blue-600 font-semibold text-sm"
                    >
                      Xem chi tiết
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Roadmap Section */}
      <div className="relative z-10 bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Lộ trình <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">Học tập</span>
            </h2>
            <p className="text-lg text-slate-500">5 bước để trở thành chuyên gia</p>
          </motion.div>

          <div className="relative">
            {/* Animated Dotted Line Path */}
            <svg className="absolute left-8 top-0 h-full w-0.5 hidden md:block" style={{ zIndex: 0 }}>
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeDasharray="8 8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Roadmap Steps */}
            <div className="space-y-8">
              {LEARNING_PATH.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: index * 0.15 }}
                  className="relative flex items-start gap-6 group"
                >
                  {/* Node Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                    className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-3xl shadow-xl shadow-indigo-500/30 relative z-10 group-hover:scale-110 transition-transform duration-300"
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content Card */}
                  <motion.div 
                    whileHover={{ x: 4 }}
                    className="flex-1 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 p-6 group-hover:border-indigo-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
                        Bước {step.step}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Marquee Section */}
      <div className="relative z-10 bg-slate-50/30 py-16 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Được Tin tưởng
          </h2>
          <p className="text-lg text-slate-500">Phản hồi từ học viên thực tế</p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-6"
            whileHover={{ animationPlayState: "paused" }}
          >
            {/* Duplicate testimonials for seamless loop */}
            {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 bg-white rounded-xl border border-slate-200 shadow-sm p-6"
              >
                <p className="text-slate-600 mb-4 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* About Team Section - Ở dưới cùng trang */}
      <div id="about" className="relative z-10 bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Team Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {teamInfo.groupName}
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-violet-600 mx-auto rounded-full mb-8"></div>
          </motion.div>

          {/* Topic */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 mb-12 border border-slate-200 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <Award className="text-indigo-600 mt-1 flex-shrink-0" size={32} />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Ngữ cảnh & Mục tiêu</h3>
                <p className="text-slate-600 leading-relaxed">{teamInfo.topic}</p>
              </div>
            </div>
          </motion.div>

          {/* Members */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-slate-900" size={28} />
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Thành viên nhóm</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamInfo.members.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-300 transition-all duration-300 p-6 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-2xl shadow-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-base tracking-tight group-hover:text-indigo-600 transition-colors">{member.name}</h4>
                      <p className="text-sm text-slate-500">{member.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Modal */}
      <FAQModal isOpen={showFAQ} onClose={() => setShowFAQ(false)} />
    </div>
  );
};

export default LoginPage;
