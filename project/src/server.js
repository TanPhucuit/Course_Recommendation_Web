const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Data Stores
const users = {}; // user_id -> user data
const courses = {}; // course_id -> course data (name, about)
const courseChapters = {}; // course_id -> chapters
const userProgress = []; // List of {user, course, interact}

// Paths to CSVs
const DATA_DIR = path.join(__dirname, '../../web_data');

// Translation Dictionary (Mock for Demo)
const dictionary = {
    '导读': 'Hướng dẫn đọc',
    '数据科学': 'Khoa học dữ liệu',
    '算法': 'Thuật toán',
    '理论': 'Lý thuyết',
    '清华大学': 'Đại học Thanh Hoa',
    '我': 'Tôi' // Just in case
};

function translate(text) {
    if (!text) return '';
    let translated = text;
    for (const [cn, vn] of Object.entries(dictionary)) {
        translated = translated.replace(new RegExp(cn, 'g'), vn);
    }
    return translated; // In a real app, use a translation API here
}

function loadData() {
    console.log('Loading data...');

    // Load User Info
    fs.createReadStream(path.join(DATA_DIR, 'user_info.csv'))
        .pipe(csv())
        .on('data', (row) => {
            // Adjust keys based on actual CSV headers (checking for messy headers)
            const id = row['user_id'] || row['\ufeffuser_id']; // Handle BOM
            if (id) {
                users[id] = { ...row, user_id: id };
            }
        })
        .on('end', () => console.log('Users loaded'));

    // Load Course About
    fs.createReadStream(path.join(DATA_DIR, 'courses_about.csv'))
        .pipe(csv())
        .on('data', (row) => {
            const id = row['id'];
            if (id) {
                courses[id] = { ...courses[id], ...row, name_vn: translate(row.about) }; // Temp use about if name missing
            }
        })
        .on('end', () => console.log('Courses About loaded'));

    // Load Course Chapters (Get Names)
    fs.createReadStream(path.join(DATA_DIR, 'course_chapter.csv'))
        .pipe(csv())
        .on('data', (row) => {
            const id = row['course_id'];
            if (id) {
                if (!courses[id]) courses[id] = {};
                courses[id].name = row.course_name;
                courses[id].name_vn = translate(row.course_name);
                courses[id].chapters = row.titles;
            }
        })
        .on('end', () => console.log('Course Chapters loaded'));

    // Load User Progress
    fs.createReadStream(path.join(DATA_DIR, 'user_course_complete.csv'))
        .pipe(csv())
        .on('data', (row) => {
             userProgress.push(row);
        })
        .on('end', () => console.log('User Progress loaded'));
}

loadData();

// API Endpoints

// Login
app.post('/api/login', (req, res) => {
    const { userId } = req.body;
    if (users[userId]) {
        res.json({ success: true, user: users[userId] });
    } else {
        res.status(401).json({ success: false, message: 'User ID not found' });
    }
});

// Get Dashboard Data
app.get('/api/dashboard/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users[userId];
    
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Find courses for this user
    // user_course_complete has columns: user, course, interact
    const userCourses = userProgress
        .filter(p => p.user === userId)
        .map(p => {
            const courseData = courses[p.course] || {};
            return {
                courseId: p.course,
                interact: p.interact,
                name: courseData.name || 'Unknown Course',
                name_vn: courseData.name_vn || (courseData.name ? translate(courseData.name) : 'Khóa học không xác định'),
                about: courseData.about || '',
                chapters: courseData.chapters || ''
            };
        });

    res.json({
        user,
        courses: userCourses
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
