# CSV Data Integration - Documentation

## Tổng quan

Hệ thống đã được cập nhật để tích hợp dữ liệu từ các file CSV trong folder `web_data/` vào ứng dụng LMS hiện tại. Dữ liệu landing page (teamInfo, companyInfo, faqData) vẫn giữ nguyên như mockData.

## Cấu trúc CSV Files

### 1. courses_about.csv
**Columns:** `id`, `about`
- **id**: ID khóa học (format: C_xxxxxx)
- **about**: Mô tả chi tiết về khóa học

**Mapping vào mockData:**
```javascript
{
  id: "C_584313",
  description: "通过老师导读，同学们可深入这一经典文本内部..."
}
```

### 2. course_chapter.csv  
**Columns:** `course_id`, `course_name`, `titles`, `chapter`
- **course_id**: ID khóa học
- **course_name**: Tên khóa học
- **titles**: Tiêu đề của chapter/lesson
- **chapter**: Số thứ tự chapter (format: 1.1.1, 1.2.1, etc.)

**Mapping vào mockData:**
```javascript
{
  chapters: [
    {
      id: "ch1",
      title: "Chương 1",
      lessons: [
        { id: "l1", title: "Bài 1: ...", videoUrl: "..." }
      ]
    }
  ]
}
```

### 3. user_course_complete.csv
**Columns:** `user`, `course`, `interact`
- **user**: User ID (format: U_xxxxx)
- **course**: Course ID (số course ID, không có prefix C_)
- **interact**: Tiến độ hoàn thành (0.0 - 1.0)

**Mapping vào mockData:**
```javascript
{
  enrolledCourses: ["course1", "course2"],
  completedCourses: ["course1"], // courses với interact >= 1.0
  progress: {
    overall: 65,
    courses: {
      course1: 100, // interact * 100
      course2: 30
    }
  }
}
```

### 4. user_info.csv
**Note:** File quá lớn (>50MB), không load trực tiếp. Thay vào đó:
- Authenticate chỉ dựa vào User ID format (U_xxxxx)
- Thông tin user được tạo động khi login
- Dữ liệu thực tế từ `user_course_complete.csv`

## Cách hoạt động

### 1. Login với User ID (Không cần password)

```javascript
// User nhập: U_10000
// Hệ thống:
1. Validate format U_xxxxx
2. Load user courses từ user_course_complete.csv  
3. Tạo user object với:
   - enrolledCourses từ CSV
   - completedCourses từ CSV (interact >= 1.0)
   - progress từ CSV
4. Đăng nhập thành công
```

### 2. Hiển thị Courses

Courses được enriched với dữ liệu CSV:

```javascript
// Base course từ mockCourses
{
  id: "course1",
  title: "Lập trình Python cơ bản",
  ...
}

// Enriched với CSV data
{
  id: "C_584313",
  title: "《资治通鉴》导读", // từ course_chapter.csv
  description: "通过老师导读...", // từ courses_about.csv
  chapters: [...], // từ course_chapter.csv
  ...
}
```

### 3. Dashboard User

Khi user login, dashboard hiển thị:
- **Enrolled Courses**: Tất cả courses từ user_course_complete.csv
- **Progress**: Tính từ `interact` column (0-100%)
- **Completed Courses**: Courses có interact >= 1.0

## API Functions

### dataLoader Service

```javascript
import dataLoader from './services/dataLoader';

// Load courses data
const coursesData = await dataLoader.loadCoursesData();

// Load chapters data
const chaptersData = await dataLoader.loadChaptersData();

// Load user courses data
const userCoursesData = await dataLoader.loadUserCoursesData();

// Get user specific data
const userData = await dataLoader.getUserData('U_10000');

// Validate user ID
const isValid = dataLoader.isValidUserId('U_10000'); // true
```

### Updated mockData Functions

```javascript
import { authenticateUser, getCourseById } from './data/mockData';

// Login với userId (async now)
const user = await authenticateUser('U_10000', '');

// Get course with CSV data (async now)
const course = await getCourseById('C_584313');
```

## Testing

### Test Login với User ID từ CSV

1. Mở app
2. Click "Đăng nhập"
3. Nhập User ID: `U_10000` (hoặc bất kỳ user nào từ user_course_complete.csv)
4. Bỏ trống password
5. Click "Đăng nhập"

→ Hệ thống sẽ load courses của user từ CSV và hiển thị trong dashboard

### Test với Mock Users (fallback)

Nếu muốn test với mock users cũ:
- Username: `student1`, Password: `123456`
- Username: `admin`, Password: `admin123`

## File Changes

### Modified Files:
1. `src/data/mockData.js` - Import dataLoader, update authenticateUser & getCourseById
2. `src/context/AuthContext.jsx` - Make login async
3. `src/pages/LoginPage.jsx` - Update UI hints, make handleSubmit async
4. `public/web_data/` - Copied CSV files

### New Files:
1. `src/services/dataLoader.js` - Service để load và parse CSV data

## Notes

- Landing page data (teamInfo, companyInfo, faqData) giữ nguyên
- Mock courses vẫn được giữ làm fallback
- CSV data được cached để tránh load nhiều lần
- Tất cả CSV operations đều async
- User ID format: `U_xxxxx` (ví dụ: U_10000, U_1000038)
