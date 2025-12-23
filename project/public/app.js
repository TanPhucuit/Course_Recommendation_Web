const API_URL = 'http://localhost:3000/api';

// Select elements
const loginForm = document.getElementById('loginForm');
const courseGrid = document.getElementById('courseGrid');

// Check which page we are on
if (loginForm) {
    // Login Page Logic
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = document.getElementById('userId').value.trim();
        const errorMsg = document.getElementById('errorMsg');

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                window.location.href = 'dashboard.html';
            } else {
                errorMsg.style.display = 'block';
                errorMsg.textContent = data.message || 'Login failed';
            }
        } catch (err) {
            console.error(err);
            errorMsg.style.display = 'block';
            errorMsg.textContent = 'Connection error';
        }
    });
} else if (courseGrid) {
    // Dashboard Logic
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
        window.location.href = 'index.html';
    }

    const user = JSON.parse(userStr);

    // Set Header Info
    document.getElementById('userAvatar').textContent = user.user_id.charAt(0).toUpperCase();
    document.getElementById('userName').textContent = user.full_name || user.user_id;
    document.getElementById('userSchool').textContent = user.school || 'Không có thông tin trường';

    // Fetch Courses
    loadCourses(user.user_id);
}

async function loadCourses(userId) {
    try {
        const res = await fetch(`${API_URL}/dashboard/${userId}`);
        const data = await res.json();

        courseGrid.innerHTML = '';

        if (data.courses.length === 0) {
            courseGrid.innerHTML = '<p class="glass-card" style="text-align: center; color: var(--text-muted);">Không tìm thấy khóa học nào.</p>';
            return;
        }

        data.courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'glass-card course-card';

            // Format interact to percent
            const interactPct = (course.interact * 100).toFixed(1);

            card.innerHTML = `
                <div style="min-height: 80px;">
                    <h3>${course.name_vn}</h3>
                    <p style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.5rem;">${course.name !== course.name_vn ? course.name : ''}</p>
                </div>
                <div class="course-prob">
                   ${course.about ? course.about.substring(0, 100) + '...' : 'Không có mô tả'}
                </div>
                <div style="margin-top: auto;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem;">
                        <span>Tiến độ</span>
                        <span>${interactPct}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.min(interactPct, 100)}%"></div>
                    </div>
                </div>
            `;
            courseGrid.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        courseGrid.innerHTML = '<p>Error loading courses.</p>';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
