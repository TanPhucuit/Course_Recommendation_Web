import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const NotificationDropdown = ({ notifications = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifList, setNotifList] = useState(notifications);

  const unreadCount = notifList.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifList(notifList.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="text-emerald-600" />;
      case 'warning':
        return <AlertCircle size={16} className="text-amber-600" />;
      default:
        return <Info size={16} className="text-indigo-600" />;
    }
  };

  const getNotificationDotColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500';
      case 'warning':
        return 'bg-amber-500';
      default:
        return 'bg-indigo-500';
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <Bell size={20} className="text-slate-600" />
        
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-12 w-96 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Hoạt động gần đây</h3>
                  {unreadCount > 0 && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      {unreadCount} thông báo mới
                    </p>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold"
                  >
                    Đánh dấu đã đọc
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-[480px] overflow-y-auto">
                {notifList.length > 0 ? (
                  <div className="py-2">
                    {notifList.map((notif, index) => (
                      <div
                        key={notif.id}
                        className={`px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer border-l-2 ${
                          notif.read ? 'border-transparent' : 'border-indigo-500 bg-indigo-50/30'
                        }`}
                      >
                        {/* Timeline Style */}
                        <div className="flex gap-3">
                          {/* Dot */}
                          <div className="relative flex-shrink-0">
                            <div className={`w-3 h-3 rounded-full ${getNotificationDotColor(notif.type)} mt-1`} />
                            {index < notifList.length - 1 && (
                              <div className="absolute left-1/2 top-4 -translate-x-1/2 w-px h-full bg-slate-200" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 mb-1">
                              {getNotificationIcon(notif.type)}
                              <p className="text-sm text-slate-700 font-medium leading-relaxed flex-1">
                                {notif.message}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                              <Clock size={12} />
                              <span>{notif.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bell className="mx-auto text-slate-300 mb-3" size={48} />
                    <p className="text-slate-400 text-sm">Không có thông báo mới</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifList.length > 0 && (
                <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
                  <button className="w-full text-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                    Xem tất cả thông báo
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
