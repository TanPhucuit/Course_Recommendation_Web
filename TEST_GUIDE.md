# Test Guide - User Profile & Course Details

## ✅ Completed Features:

### 1. User Profile Page
- **Route**: `/profile`
- **Access**: Click vào avatar/tên học viên ở header
- **Hiển thị**:
  - Avatar và tên đầy đủ
  - User ID
  - Giới tính (từ user_info.csv)
  - Trường học (từ user_info.csv)
  - Năm sinh (từ user_info.csv)
  - Thống kê: Khóa đang học, Đã hoàn thành, Tiến độ tổng thể
  - Nút "Quay lại Dashboard"

### 2. Course Detail Page (Updated)
- **Load async từ CSV**: courses_about.csv và course_chapter.csv
- **Hiển thị**:
  - Mô tả khóa học từ courses_about.csv
  - Danh sách chapters từ course_chapter.csv
  - Lessons trong mỗi chapter
  - Loading state khi đang tải dữ liệu

## 🧪 Test Cases:

### Test 1: User Profile
1. Đăng nhập với User ID: **U_10000**
2. Click vào avatar "PYQ" ở góc phải header
3. Kiểm tra:
   - ✓ Hiển thị tên: PYQ
   - ✓ Giới tính: Nữ
   - ✓ Trường học: Chưa cập nhật (NaN trong CSV)
   - ✓ Năm sinh: Chưa cập nhật (NaN trong CSV)
   - ✓ 2 khóa đang học
   - ✓ 0 đã hoàn thành
   - ✓ Tiến độ ~2%
4. Click "Quay lại Dashboard" → về dashboard

### Test 2: Course Details
1. Ở Dashboard, click vào course card bất kỳ
2. Kiểm tra:
   - ✓ Hiển thị loading spinner
   - ✓ Load xong hiển thị mô tả khóa học (tiếng Trung)
   - ✓ Hiển thị danh sách chapters
   - ✓ Click vào chapter → expand hiển thị lessons
   - ✓ Mỗi lesson có nút "Xem video"

### Test 3: Course C_680963
1. Từ Dashboard, tìm course ID: C_680963
2. Click vào course
3. Kiểm tra:
   - ✓ Title: 腐蚀与防护 (Chống ăn mòn và bảo vệ)
   - ✓ Description: 本课程是一门为工程构件制造与服役中防腐设计提供必要基础的技术科学课程...
   - ✓ 51 chapters được load
   - ✓ Chapters có tên như: "第一章 概论-1.1 腐蚀与防护的基本概念..."

## 📊 Expected Data:

**User U_10000:**
- Full Name: PYQ
- Gender: Nữ (0.0)
- School: NaN → "Chưa cập nhật"
- Year of Birth: NaN → "Chưa cập nhật"
- Enrolled Courses: 2
  - C_680963 (0% progress)
  - C_2033958 (2.9% progress)

**Course C_680963:**
- Title: 腐蚀与防护
- Chapters: 51
- Description: Chinese text from courses_about.csv

**Course C_2033958:**
- Chapters: 75
- Description: Available in courses_about.csv

## 🐛 Known Issues:
- Nếu CSV chưa load → hiển thị "Đang cập nhật"
- User info có NaN → hiển thị "Chưa cập nhật"
- Chapters được group theo số chương chính (1, 2, 3...)

## 🎯 Next Steps:
1. Test với nhiều user IDs khác
2. Verify chapters display correctly
3. Check course descriptions loading
4. Test navigation flow
