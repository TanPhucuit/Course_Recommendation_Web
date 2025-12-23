# Hướng dẫn sử dụng - MOOCCUBE LMS

## 🎯 Tổng quan

Hệ thống MOOCCUBE LMS đã được tích hợp với dữ liệu thực từ các file CSV, cho phép đăng nhập và quản lý khóa học dựa trên dữ liệu thực tế.

## 🔐 Đăng nhập

### Cách 1: Đăng nhập bằng User ID (Khuyến nghị - Không cần mật khẩu)

1. Click nút **"Đăng nhập"** ở góc trên bên phải
2. Nhập **User ID** theo format: `U_xxxxx`
   - Ví dụ: `U_10000`, `U_100066`, `U_1000038`
3. **Bỏ qua** trường mật khẩu (không cần nhập)
4. Click "Đăng nhập"

**Lưu ý:** User ID phải tồn tại trong file `user_course_complete.csv`

### Cách 2: Đăng nhập bằng Mock Account (Fallback)

Nếu muốn test với tài khoản mẫu:

**Student Account:**
- Username: `student1`
- Password: `123456`

**Admin Account:**
- Username: `admin`
- Password: `admin123`

## 📚 Các tính năng chính

### 1. Dashboard Người dùng

Sau khi đăng nhập với User ID, bạn sẽ thấy:

- **Khóa học của tôi**: Tất cả khóa học bạn đã đăng ký (từ CSV)
- **Tiến độ học tập**: % hoàn thành của từng khóa học
- **Thống kê**: 
  - Số khóa đã đăng ký
  - Số khóa đã hoàn thành (interact >= 100%)
  - Tiến độ tổng thể
- **Đề xuất khóa học**: AI gợi ý khóa học phù hợp
- **Các khóa học cùng chủ đề**: Khóa học liên quan

### 2. Chi tiết khóa học

Click vào bất kỳ khóa học nào để xem:
- Thông tin chi tiết từ `courses_about.csv`
- Danh sách chapters từ `course_chapter.csv`
- Video lessons và bài tập
- Tiến độ học tập của bạn

### 3. Trang chủ (Landing Page)

Trang chủ hiển thị:
- Thông tin nhóm (teamInfo)
- Thông tin liên hệ (companyInfo)
- FAQ (Câu hỏi thường gặp)
- Thống kê hệ thống
- Featured courses

## 🔍 Dữ liệu từ CSV

### Courses
- **Nguồn**: `courses_about.csv` + `course_chapter.csv`
- **Thông tin**: Mô tả khóa học, chapters, lessons
- **Format ID**: `C_xxxxxx` (ví dụ: C_584313)

### User Progress
- **Nguồn**: `user_course_complete.csv`
- **Thông tin**:
  - Khóa học đã đăng ký
  - Tiến độ (0-100%)
  - Khóa học đã hoàn thành (100%)

## 🎨 Giao diện

- **Landing Page**: Giữ nguyên thiết kế MOOCCUBE với wave animation
- **Dashboard**: Hiển thị courses và progress từ CSV data
- **Course Detail**: Enriched với dữ liệu CSV

## 🧪 Test Cases

### Test 1: Login với User ID từ CSV

```
User ID: U_10000
Password: (bỏ trống)
Expected: Đăng nhập thành công, hiển thị courses của user U_10000
```

### Test 2: View enrolled courses

```
After login → Dashboard → "Khóa học của tôi"
Expected: Hiển thị tất cả courses từ user_course_complete.csv
```

### Test 3: Check progress

```
After login → Dashboard → Click vào course
Expected: Hiển thị % progress từ CSV (interact * 100)
```

### Test 4: View course details

```
Dashboard → Click course → View chapters
Expected: Hiển thị chapters từ course_chapter.csv
```

## 📊 Sample User IDs để test

Từ `user_course_complete.csv`:
- `U_10000` - User có courses
- `U_100066` - User với nhiều courses
- `U_100090` - User với tiến độ khác nhau
- `U_1000038` - User mới

## ⚠️ Lưu ý

1. **File user_info.csv quá lớn** (>50MB) nên không load trực tiếp
2. Authentication chỉ dựa vào **format User ID** (U_xxxxx)
3. Thông tin user được **tạo động** khi login
4. **Landing page data** (teamInfo, companyInfo, FAQ) vẫn dùng mock data
5. Nếu course không tồn tại trong CSV, hệ thống fallback về mock courses

## 🚀 Chạy ứng dụng

```bash
npm run dev
```

App sẽ chạy tại: http://localhost:5173 (hoặc port khác nếu 5173 đang được sử dụng)

## 📝 Cấu trúc dữ liệu

### User Object (sau khi login với User ID)
```javascript
{
  id: "U_10000",
  username: "U_10000",
  role: "user",
  fullName: "Người dùng U_10000",
  email: "U_10000@mooccube.vn",
  avatar: "https://i.pravatar.cc/150?u=U_10000",
  enrolledCourses: ["680963", "2033958", ...],
  completedCourses: ["2033958"], // interact >= 1.0
  progress: {
    overall: 2, // Average of all courses
    courses: {
      "680963": 0,
      "2033958": 3  // interact * 100 (rounded)
    }
  }
}
```

### Course Object (enriched với CSV)
```javascript
{
  id: "C_584313",
  title: "《资治通鉴》导读", // từ course_chapter.csv
  description: "通过老师导读...", // từ courses_about.csv
  category: "General",
  instructor: "Giảng viên",
  school: "MOOCCUBE",
  chapters: [...], // từ course_chapter.csv
  videoCount: 50, // số lượng chapters
  // ... other fields
}
```

## 🎓 Workflow thực tế

1. **User login** với ID `U_10000`
2. **System load** data từ `user_course_complete.csv`
3. **Dashboard hiển thị**:
   - 2 enrolled courses (680963, 2033958)
   - Progress: 0% và 3%
   - 1 completed course nếu có interact >= 1.0
4. **User click** vào course
5. **System load** course details từ:
   - `courses_about.csv` → description
   - `course_chapter.csv` → chapters & title
6. **Hiển thị** course page với full information

## 💡 Tips

- User ID phải bắt đầu bằng `U_` (ví dụ: U_10000)
- Không cần nhập password khi dùng User ID
- Mock accounts vẫn hoạt động bình thường
- CSV data được cache để tăng performance
- Có thể dùng browser DevTools để xem data được load

---

**Developed by:** NHÓM 7 - LỚP DS317
**Contact:** contact@mooccube.vn
