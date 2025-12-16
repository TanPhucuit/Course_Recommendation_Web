import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';

const DashboardLayout = ({ children, notifications = [] }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navbar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                {currentUser?.role === 'admin' ? 'Bảng điều khiển Admin' : 'Bảng điều khiển Học viên'}
              </h1>
              <p className="text-xs text-slate-500">
                <span className="text-slate-700 font-semibold">MOOC</span>
                <span className="text-indigo-600 font-semibold">CUBE</span>
              </p>
            </div>
          </div>

          {/* Right: Notifications, User Info, Logout */}
          <div className="flex items-center gap-4">
            {/* Notification Dropdown */}
            <NotificationDropdown notifications={notifications} />

            {/* User Info */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.fullName}
                className="w-9 h-9 rounded-full border-2 border-slate-200"
              />
              <div className="text-left">
                <p className="font-semibold text-slate-900 text-sm">{currentUser?.fullName}</p>
                <p className="text-xs text-slate-500">{currentUser?.role === 'admin' ? 'Quản trị viên' : 'Học viên'}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all duration-200 font-medium text-sm shadow-sm"
            >
              <LogOut size={16} />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
