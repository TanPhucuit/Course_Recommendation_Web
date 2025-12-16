// Mock Data for LMS Application

export const teamInfo = {
  groupName: "NHÓM 7 - LỚP DS317",
  topic: "Với số lượng video lớn như hiện nay, việc chọn video nào phù hợp với người dùng là việc khá khó khăn. Do đó, nhóm đề xuất xây dựng một hệ thống gợi ý khóa học mục tiêu giúp người dùng có thể hiểu rõ hơn các bài giảng và đạt được kết quả cao. Cá nhân hóa việc học, tối ưu hóa lộ trình học, hỗ trợ học tập suốt đời, và tăng hiệu quả đầu tư vào MOOC.",
  members: [
    { name: "22520093 – Nguyễn Xuân Bách", role: "Thành viên" },
    { name: "22521123 – Mạc Nguyên Phúc", role: "Thành viên" },
    { name: "22521294 – Trương Lưu Song Tâm", role: "Thành viên" },
    { name: "2521573 – Võ Tấn Trung", role: "Nhóm trưởng" },
    { name: "23521197 – Huỳnh Tấn Phúc", role: "Thành viên" },
  ]
};

export const companyInfo = {
  name: "MOOCCUBE",
  address: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
  phone: "0123-456-789",
  email: "contact@mooccube.vn"
};

export const faqData = [
  {
    question: "Làm sao để đăng ký khóa học?",
    answer: "Sau khi đăng nhập, bạn vào mục 'Đề xuất khóa học', chọn khóa học phù hợp và nhấn nút 'Đăng ký'."
  },
  {
    question: "Tôi quên mật khẩu, phải làm sao?",
    answer: "Vui lòng liên hệ admin qua email hoặc hotline để được hỗ trợ khôi phục mật khẩu."
  },
  {
    question: "Khóa học có giới hạn thời gian không?",
    answer: "Mỗi khóa học có thời hạn riêng, thông tin chi tiết được hiển thị trong trang khóa học."
  },
  {
    question: "AI đề xuất khóa học hoạt động như thế nào?",
    answer: "Hệ thống phân tích lịch sử học tập, sở thích và mục tiêu của bạn để đề xuất các khóa học phù hợp nhất."
  }
];

export const mockUsers = [
  {
    id: "user1",
    username: "student1",
    password: "123456",
    role: "user",
    fullName: "Nguyễn Minh Tuấn",
    email: "student1@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    enrolledCourses: ["course1", "course2"],
    completedCourses: ["course1"],
    progress: {
      overall: 65,
      courses: {
        course1: 100,
        course2: 30
      }
    }
  },
  {
    id: "user2",
    username: "student2",
    password: "123456",
    role: "user",
    fullName: "Trần Thị Hương",
    email: "student2@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    enrolledCourses: ["course3"],
    completedCourses: [],
    progress: {
      overall: 20,
      courses: {
        course3: 20
      }
    }
  }
];

export const mockAdmins = [
  {
    id: "admin1",
    username: "admin",
    password: "admin123",
    role: "admin",
    fullName: "Quản Trị Viên",
    email: "admin@mooccube.vn",
    avatar: "https://i.pravatar.cc/150?img=12"
  }
];

export const mockCourses = [
  {
    id: "course1",
    title: "Lập trình Python cơ bản",
    category: "Lập trình",
    instructor: "TS. Nguyễn Văn Phúc",
    school: "Đại học Công nghệ",
    duration: "8 tuần",
    videoCount: 24,
    exerciseCount: 12,
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
    description: "Khóa học giúp bạn nắm vững các kiến thức cơ bản về Python.",
    enrolledCount: 150,
    completedCount: 89,
    chapters: [
      {
        id: "ch1",
        title: "Chương 1: Giới thiệu Python",
        lessons: [
          { id: "l1", title: "Bài 1: Cài đặt Python", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: "l2", title: "Bài 2: Biến và kiểu dữ liệu", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: "l3", title: "Bài 3: Câu lệnh điều kiện", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
        ]
      },
      {
        id: "ch2",
        title: "Chương 2: Cấu trúc dữ liệu",
        lessons: [
          { id: "l4", title: "Bài 4: List và Tuple", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: "l5", title: "Bài 5: Dictionary", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
        ]
      }
    ]
  },
  {
    id: "course2",
    title: "React JS - Xây dựng Web hiện đại",
    category: "Lập trình",
    instructor: "ThS. Trần Minh Quang",
    school: "Đại học Bách Khoa",
    duration: "10 tuần",
    videoCount: 30,
    exerciseCount: 15,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    description: "Học React từ cơ bản đến nâng cao, xây dựng ứng dụng web chuyên nghiệp.",
    enrolledCount: 200,
    completedCount: 120,
    chapters: [
      {
        id: "ch1",
        title: "Chương 1: React Cơ bản",
        lessons: [
          { id: "l1", title: "Bài 1: Giới thiệu React", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: "l2", title: "Bài 2: Components", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
        ]
      }
    ]
  },
  {
    id: "course3",
    title: "Data Science với Python",
    category: "Khoa học dữ liệu",
    instructor: "PGS.TS. Lê Thị Mai",
    school: "Đại học Khoa học Tự nhiên",
    duration: "12 tuần",
    videoCount: 36,
    exerciseCount: 20,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    description: "Khóa học toàn diện về khoa học dữ liệu và machine learning.",
    enrolledCount: 180,
    completedCount: 95,
    chapters: [
      {
        id: "ch1",
        title: "Chương 1: Nhập môn Data Science",
        lessons: [
          { id: "l1", title: "Bài 1: Tổng quan", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
        ]
      }
    ]
  },
  {
    id: "course4",
    title: "UI/UX Design cơ bản",
    category: "Thiết kế",
    instructor: "Nguyễn Thị Lan",
    school: "Đại học Mỹ thuật",
    duration: "6 tuần",
    videoCount: 18,
    exerciseCount: 10,
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
    description: "Học thiết kế giao diện người dùng chuyên nghiệp.",
    enrolledCount: 130,
    completedCount: 75,
    chapters: []
  },
  {
    id: "course5",
    title: "Machine Learning A-Z",
    category: "AI & Machine Learning",
    instructor: "TS. Hoàng Văn Tuấn",
    school: "Đại học Công nghệ",
    duration: "14 tuần",
    videoCount: 42,
    exerciseCount: 25,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
    description: "Khóa học machine learning từ cơ bản đến nâng cao.",
    enrolledCount: 220,
    completedCount: 110,
    chapters: []
  },
  {
    id: "course6",
    title: "Node.js Backend Development",
    category: "Lập trình",
    instructor: "ThS. Phạm Đức Anh",
    school: "Đại học Bách Khoa",
    duration: "9 tuần",
    videoCount: 28,
    exerciseCount: 14,
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
    description: "Xây dựng REST API và ứng dụng backend với Node.js và Express.",
    enrolledCount: 165,
    completedCount: 88,
    chapters: []
  },
  {
    id: "course7",
    title: "Deep Learning với TensorFlow",
    category: "AI & Machine Learning",
    instructor: "PGS.TS. Võ Minh Đức",
    school: "Đại học Khoa học Tự nhiên",
    duration: "16 tuần",
    videoCount: 48,
    exerciseCount: 30,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    description: "Học deep learning và neural networks với TensorFlow 2.0.",
    enrolledCount: 145,
    completedCount: 62,
    chapters: []
  },
  {
    id: "course8",
    title: "Thiết kế đồ họa với Adobe Illustrator",
    category: "Thiết kế",
    instructor: "Lê Văn Hải",
    school: "Đại học Mỹ thuật",
    duration: "7 tuần",
    videoCount: 21,
    exerciseCount: 12,
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400",
    description: "Làm chủ công cụ thiết kế vector chuyên nghiệp Adobe Illustrator.",
    enrolledCount: 98,
    completedCount: 54,
    chapters: []
  },
  {
    id: "course9",
    title: "SQL và Quản lý Cơ sở dữ liệu",
    category: "Khoa học dữ liệu",
    instructor: "TS. Đặng Thị Thu",
    school: "Đại học Công nghệ",
    duration: "8 tuần",
    videoCount: 24,
    exerciseCount: 16,
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400",
    description: "Học SQL từ cơ bản đến nâng cao, tối ưu hóa truy vấn database.",
    enrolledCount: 210,
    completedCount: 132,
    chapters: []
  },
  {
    id: "course10",
    title: "Vue.js 3 - The Complete Guide",
    category: "Lập trình",
    instructor: "Nguyễn Hoàng Long",
    school: "Đại học Bách Khoa",
    duration: "10 tuần",
    videoCount: 32,
    exerciseCount: 18,
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400",
    description: "Xây dựng ứng dụng web với Vue.js 3 và Composition API.",
    enrolledCount: 142,
    completedCount: 76,
    chapters: []
  },
  {
    id: "course11",
    title: "Digital Marketing từ A-Z",
    category: "Marketing",
    instructor: "ThS. Trần Thị Ngọc",
    school: "Đại học Kinh tế",
    duration: "6 tuần",
    videoCount: 18,
    exerciseCount: 10,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    description: "Chiến lược marketing online, SEO, Google Ads và Social Media.",
    enrolledCount: 185,
    completedCount: 108,
    chapters: []
  },
  {
    id: "course12",
    title: "Photoshop cho Designer",
    category: "Thiết kế",
    instructor: "Phạm Thu Hà",
    school: "Đại học Mỹ thuật",
    duration: "8 tuần",
    videoCount: 26,
    exerciseCount: 14,
    thumbnail: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400",
    description: "Kỹ thuật chỉnh sửa ảnh và thiết kế đồ họa chuyên nghiệp.",
    enrolledCount: 167,
    completedCount: 92,
    chapters: []
  },
  {
    id: "course13",
    title: "Big Data với Apache Spark",
    category: "Khoa học dữ liệu",
    instructor: "TS. Nguyễn Văn Khoa",
    school: "Đại học Công nghệ",
    duration: "12 tuần",
    videoCount: 36,
    exerciseCount: 22,
    thumbnail: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400",
    description: "Xử lý và phân tích dữ liệu lớn với Apache Spark và PySpark.",
    enrolledCount: 124,
    completedCount: 58,
    chapters: []
  },
  {
    id: "course14",
    title: "Flutter - Lập trình Mobile đa nền tảng",
    category: "Lập trình",
    instructor: "ThS. Lê Minh Tuấn",
    school: "Đại học Bách Khoa",
    duration: "11 tuần",
    videoCount: 34,
    exerciseCount: 20,
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
    description: "Phát triển ứng dụng iOS và Android với Flutter framework.",
    enrolledCount: 156,
    completedCount: 71,
    chapters: []
  },
  {
    id: "course15",
    title: "Natural Language Processing",
    category: "AI & Machine Learning",
    instructor: "PGS.TS. Trần Văn Bình",
    school: "Đại học Khoa học Tự nhiên",
    duration: "14 tuần",
    videoCount: 40,
    exerciseCount: 26,
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400",
    description: "Xử lý ngôn ngữ tự nhiên với Python, NLTK và Transformers.",
    enrolledCount: 118,
    completedCount: 52,
    chapters: []
  }
];

export const mockNotifications = [
  {
    id: "notif1",
    message: "Chào mừng bạn đến với hệ thống LMS!",
    timestamp: "2024-01-15 09:00:00",
    type: "info"
  },
  {
    id: "notif2",
    message: "Bạn đã hoàn thành khóa học Python cơ bản",
    timestamp: "2024-01-14 14:30:00",
    type: "success"
  },
  {
    id: "notif3",
    message: "Nhắc nhở: Hạn nộp bài tập tuần 5 là ngày mai",
    timestamp: "2024-01-13 10:00:00",
    type: "warning"
  },
  {
    id: "notif4",
    message: "Khóa học React JS vừa có video mới",
    timestamp: "2024-01-12 16:45:00",
    type: "info"
  }
];

export const mockAdminLogs = [
  {
    id: "log1",
    message: "Người dùng 'student1' đăng ký khóa học 'Python cơ bản'",
    timestamp: "2024-01-15 08:30:00"
  },
  {
    id: "log2",
    message: "Người dùng 'student2' hoàn thành khóa học 'UI/UX Design'",
    timestamp: "2024-01-14 15:20:00"
  },
  {
    id: "log3",
    message: "Khóa học 'React JS' được cập nhật nội dung mới",
    timestamp: "2024-01-13 11:00:00"
  },
  {
    id: "log4",
    message: "50 người dùng mới đăng ký trong tuần",
    timestamp: "2024-01-12 09:00:00"
  }
];

// Helper function to get user by credentials
export const authenticateUser = (username, password) => {
  const user = [...mockUsers, ...mockAdmins].find(
    u => u.username === username && u.password === password
  );
  return user || null;
};

// Helper function to get course by ID
export const getCourseById = (courseId) => {
  return mockCourses.find(c => c.id === courseId);
};

// Helper function to get AI suggested courses (giả lập dựa trên profile người dùng)
export const getAISuggestedCourses = (userId) => {
  // Giả lập AI suggest - đề xuất dựa trên category và popularity
  // Trả về các khóa học AI/ML, Data Science và Lập trình phổ biến
  const aiSuggestions = mockCourses.filter(c => 
    c.category === "AI & Machine Learning" || 
    c.category === "Khoa học dữ liệu" ||
    (c.category === "Lập trình" && c.enrolledCount > 150)
  );
  return aiSuggestions.slice(0, 6); // Top 6 courses
};

// Helper function to get related courses based on enrolled courses
export const getRelatedCourses = (enrolledCourseIds) => {
  // Lấy categories của các khóa đã đăng ký
  const enrolledCourses = mockCourses.filter(c => enrolledCourseIds.includes(c.id));
  const enrolledCategories = [...new Set(enrolledCourses.map(c => c.category))];
  
  // Lấy các khóa học cùng category nhưng chưa đăng ký
  const relatedCourses = mockCourses.filter(c => 
    enrolledCategories.includes(c.category) && 
    !enrolledCourseIds.includes(c.id)
  );
  
  return relatedCourses;
};

// Helper function to get courses by category
export const getCoursesByCategory = (category) => {
  return mockCourses.filter(c => c.category === category);
};
