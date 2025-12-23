# Debug Instructions - enrolledCount không hiển thị

## ✅ Data đã sẵn sàng:
- courses_about.csv có cột user_count ✓
- C_680963: 300 người học ✓
- C_2033958: 324 người học ✓
- dataLoader.js đang load user_count → enrolledCount ✓
- getCourseById trả về enrolledCount ✓
- CourseCard hiển thị enrolledCount ✓

## 🔍 Cách debug:

### Bước 1: Hard Reload Browser
```
Ctrl + Shift + R (hoặc Cmd + Shift + R trên Mac)
```
Để clear browser cache và reload tất cả files

### Bước 2: Kiểm tra Console Log
1. Mở Developer Tools (F12)
2. Chuyển đến tab Console
3. Reload trang
4. Tìm log "Loaded course C_680963:" và "Loaded course C_2033958:"
5. Xem object có property `enrolledCount` không

### Bước 3: Verify trong Console
Paste đoạn code này vào Console khi ở Dashboard:

```javascript
// Test if data is loaded
const testCourse = document.querySelector('[class*="CourseCard"]');
console.log("Found course card:", testCourse);

// Check if API loads data correctly
fetch('/courses_about.csv')
  .then(r => r.text())
  .then(text => {
    const lines = text.split('\n').filter(l => l.includes('C_680963'));
    console.log("C_680963 in CSV:", lines);
  });
```

### Bước 4: Nếu vẫn không work
1. Stop dev server (Ctrl+C in terminal)
2. Xóa folder .vite (cache)
   ```powershell
   Remove-Item -Recurse -Force node_modules/.vite
   ```
3. Restart dev server
   ```powershell
   npm run dev
   ```

## 📊 Expected Result:
Sau khi hard reload, các course cards sẽ hiển thị:
- **生活英语听说** (C_680963): 👤 300 người học, 📚 51 chapters
- **工程伦理** (C_2033958): 👤 324 người học, 📚 75 chapters

## 🐛 Nếu vẫn lỗi:
Check console cho error messages và báo lại.
