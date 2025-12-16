# LMS - Hệ Thống Quản Lý Khóa Học

## Mô tả
Web App quản lý khóa học (Learning Management System) được xây dựng với ReactJS, Tailwind CSS và các thư viện hiện đại.

## Tech Stack
- **React 18** với Vite
- **Tailwind CSS** - Styling
- **React Router DOM v6** - Routing
- **Lucide React** - Icons
- **Recharts** - Data visualization
- **Framer Motion** - Animations

## Cài đặt

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy development server
```bash
npm run dev
```

### 3. Build production
```bash
npm run build
```

## Tài khoản demo

### Người dùng
- Username: `student1`
- Password: `123456`

### Quản trị viên
- Username: `admin`
- Password: `admin123`

## Cấu trúc dự án

```
src/
├── components/          # Reusable components
│   ├── Modal.jsx
│   ├── AboutModal.jsx
│   ├── FAQModal.jsx
│   └── DashboardLayout.jsx
├── context/            # Context API
│   └── AuthContext.jsx
├── data/               # Mock data
│   └── mockData.js
├── pages/              # Page components
│   ├── LoginPage.jsx
│   ├── UserDashboard.jsx
│   ├── AdminDashboard.jsx
│   └── CourseDetailPage.jsx
├── App.jsx             # Main app with routing
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Tính năng chính

### 1. Trang đăng nhập/Đăng ký
- Form đăng nhập và đăng ký với tab switch
- Popup About Me (thông tin nhóm)
- Popup FAQ (câu hỏi thường gặp)
- Thông tin liên hệ

### 2. Dashboard Người dùng
- Hiển thị thông tin cá nhân
- Thống kê tiến độ học tập
- Đề xuất khóa học bằng AI
- Danh sách môn học cùng chủ đề
- Panel thông báo (30% bên phải)

### 3. Dashboard Admin
- Thống kê tổng quan hệ thống
- Danh sách tất cả khóa học
- Thống kê chi tiết từng khóa
- Panel log hoạt động (30% bên phải)

### 4. Chi tiết khóa học
- **User view**: Danh sách chapter và bài học, link video
- **Admin view**: Biểu đồ thống kê (Pie chart, Bar chart)

## Design System

### Màu sắc
- Primary: `#4F46E5` (Indigo)
- Secondary: `#6366F1` (Indigo lighter)
- Accent: `#818CF8` (Indigo light)
- Dark: `#1E293B` (Slate)
- Light: `#F8FAFC` (Slate very light)

### Typography
- Font family: Inter (Google Fonts)
- Font weights: 300, 400, 500, 600, 700, 800

### Layout
- Trang chủ: Fullscreen với các góc fixed
- Dashboard: Layout 70/30 (Main content / Notification panel)
- Course detail: 20% header / 80% content

## Responsive
- Mobile-first approach
- Breakpoints: sm, md, lg, xl (Tailwind default)
- Grid system responsive

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
MIT

## Tác giả
Nhóm Data Mining 2025
