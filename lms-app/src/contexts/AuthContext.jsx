import React, { createContext, useContext, useState, useEffect } from 'react';
import csvLoader from '../services/csvLoader';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Đăng nhập chỉ với userId (không cần password)
   */
  const login = async (userId) => {
    try {
      // Validate userId format
      if (!csvLoader.isValidUserId(userId)) {
        return {
          success: false,
          message: 'ID người dùng không hợp lệ. Định dạng: U_xxxxx'
        };
      }

      // Load courses của user để verify user tồn tại
      const userCourses = await csvLoader.getUserCourses(userId);
      
      // Tạo user object
      const user = {
        id: userId,
        username: userId,
        role: 'user',
        fullName: `Người dùng ${userId}`,
        email: `${userId}@mooccube.vn`,
        avatar: `https://i.pravatar.cc/150?u=${userId}`,
        enrolledCoursesCount: userCourses.length,
        completedCoursesCount: userCourses.filter(c => c.isCompleted).length
      };

      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.'
      };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
