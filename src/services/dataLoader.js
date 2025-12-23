import Papa from 'papaparse';
import translationService from './translationService';

/**
 * Service để load và parse CSV data từ web_data folder
 * Tích hợp dữ liệu CSV vào format của mockData hiện tại
 */
class DataLoaderService {
  constructor() {
    this.cache = {
      courses: null,
      chapters: null,
      userCourses: null,
      users: null
    };
    this.totalUserParts = 10;
    this.cacheVersion = Date.now(); // Add version to force reload
  }

  async loadCSV(filename) {
    const path = filename.startsWith('user_info_parts/') 
      ? `/web_data/${filename}` 
      : `/${filename}`;
    
    // Add cache busting with version
    const url = `${path}?v=${this.cacheVersion}`;
    
    try {
      console.log(`[DataLoader] Fetching ${url}...`);
      const response = await fetch(url, { cache: 'no-store' });
      console.log(`[DataLoader] Response for ${filename}:`, response.status, response.ok);
      
      if (response.ok) {
        const csvText = await response.text();
        console.log(`[DataLoader] ✓ Loaded ${filename}: ${csvText.length} bytes`);
        
        return new Promise((resolve) => {
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              const cols = results.data[0] ? Object.keys(results.data[0]) : [];
              console.log(`[DataLoader] ✓ Parsed ${filename}: ${results.data.length} rows`);
              console.log(`[DataLoader]   Columns: ${cols.join(', ')}`);
              if (filename === 'courses_about.csv' && results.data[0]) {
                console.log(`[DataLoader]   First row:`, results.data[0]);
              }
              resolve(results.data);
            },
            error: (err) => {
              console.error(`[DataLoader] ✗ Parse error for ${filename}:`, err);
              resolve(null);
            }
          });
        });
      } else {
        console.error(`[DataLoader] ✗ HTTP ${response.status} for ${path}`);
      }
    } catch (error) {
      console.error(`[DataLoader] ✗ Fetch error for ${path}:`, error);
    }
    
    return null;
  }

  /**
   * Load user info từ user_info split files
   * Search across all parts for a specific user
   */
  async loadUserInfo(userId) {
    // Check cache first
    if (this.cache.users && this.cache.users[userId]) {
      return this.cache.users[userId];
    }

    // Search through all parts
    for (let i = 0; i < this.totalUserParts; i++) {
      try {
        const usersData = await this.loadCSV(`user_info_parts/user_info_part_${i}.csv`);
        if (!usersData) continue;
        
        const user = usersData.find(u => u.user_id === userId);
        if (user) {
          // Translate fullName and school
          const originalName = user.full_name || `Người dùng ${userId}`;
          const originalSchool = user.school || 'Chưa cập nhật';
          
          const [translatedName, translatedSchool] = await translationService.translateBatch([
            originalName,
            originalSchool
          ]);
          
          // Cache the found user
          if (!this.cache.users) this.cache.users = {};
          this.cache.users[userId] = {
            userId: user.user_id,
            fullName: translatedName,
            gender: this.parseGender(user.gender),
            school: translatedSchool,
            yearOfBirth: user.year_of_birth || null
          };
          return this.cache.users[userId];
        }
      } catch (error) {
        console.warn(`Error loading user_info part ${i}:`, error);
      }
    }
    
    // User not found, return default
    return {
      userId: userId,
      fullName: `Người dùng ${userId}`,
      gender: 'Không xác định',
      school: 'Chưa cập nhật',
      yearOfBirth: null
    };
  }

  /**
   * Parse gender từ số sang text
   */
  parseGender(genderCode) {
    const code = parseFloat(genderCode);
    if (isNaN(code)) return 'Không xác định';
    if (code === 0.0) return 'Nữ';
    if (code === 1.0) return 'Nam';
    if (code === 2.0) return 'Khác';
    return 'Không xác định';
  }

  async loadCoursesData() {
    if (this.cache.courses) {
      console.log("[DataLoader] Using cached courses");
      return this.cache.courses;
    }
    
    console.log("[DataLoader] Loading courses_about.csv...");
    const coursesData = await this.loadCSV('courses_about.csv');
    
    if (!coursesData || coursesData.length === 0) {
      console.error("[DataLoader] ✗ No courses data loaded!");
      return {};
    }
    
    const coursesMap = {};
    coursesData.forEach(course => {
      if (course.id && course.about) {
        const enrolledCount = parseInt(course.user_count) || 0;
        coursesMap[course.id] = {
          id: course.id,
          description: course.about,
          enrolledCount: enrolledCount
        };
      }
    });
    
    console.log(`[DataLoader] ✓ Created ${Object.keys(coursesMap).length} courses`);
    console.log("[DataLoader] Sample:", Object.keys(coursesMap).slice(0, 2).map(id => `${id}: ${coursesMap[id].enrolledCount} users`));
    
    this.cache.courses = coursesMap;
    return coursesMap;
  }

  async loadChaptersData() {
    if (this.cache.chapters) return this.cache.chapters;
    
    const chaptersData = await this.loadCSV('course_chapter.csv');
    if (!chaptersData) return {};
    
    const chaptersMap = {};
    chaptersData.forEach(row => {
      const courseId = row.course_id;
      if (!courseId) return;
      
      if (!chaptersMap[courseId]) {
        chaptersMap[courseId] = {
          courseName: row.course_name || `Khóa học ${courseId}`,
          chapters: []
        };
      }
      
      chaptersMap[courseId].chapters.push({
        id: row.chapter || Math.random().toString(36).substr(2, 9),
        title: row.titles || 'Chương học',
        chapter: row.chapter
      });
    });
    
    this.cache.chapters = chaptersMap;
    return chaptersMap;
  }

  /**
   * Load user courses từ user_course_complete.csv và group theo user
   */
  async loadUserCoursesData() {
    if (this.cache.userCourses) return this.cache.userCourses;
    
    const userCoursesData = await this.loadCSV('user_course_complete.csv');
    if (!userCoursesData) return {};
    
    const userCoursesMap = {};
    userCoursesData.forEach(row => {
      const userId = row.user;
      const courseId = `C_${row.course}`; // Convert numeric ID to C_xxxxx format
      const progress = parseFloat(row.interact) || 0;
      
      if (!userId || !row.course) return;
      
      if (!userCoursesMap[userId]) {
        userCoursesMap[userId] = {
          enrolledCourses: [],
          completedCourses: [],
          progress: {
            overall: 0,
            courses: {}
          }
        };
      }
      
      userCoursesMap[userId].enrolledCourses.push(courseId);
      userCoursesMap[userId].progress.courses[courseId] = Math.round(progress * 100);
      
      if (progress >= 1.0) {
        userCoursesMap[userId].completedCourses.push(courseId);
      }
    });
    
    // Calculate overall progress for each user
    Object.keys(userCoursesMap).forEach(userId => {
      const user = userCoursesMap[userId];
      const courseProgresses = Object.values(user.progress.courses);
      if (courseProgresses.length > 0) {
        user.progress.overall = Math.round(
          courseProgresses.reduce((sum, p) => sum + p, 0) / courseProgresses.length
        );
      }
    });
    
    this.cache.userCourses = userCoursesMap;
    return userCoursesMap;
  }

  /**
   * Get enriched courses list với thông tin từ CSV
   */
  async getEnrichedCourses(baseCourses) {
    const [coursesData, chaptersData] = await Promise.all([
      this.loadCoursesData(),
      this.loadChaptersData()
    ]);
    
    if (!coursesData || !chaptersData) {
      return baseCourses; // Return original if CSV loading fails
    }
    
    return baseCourses.map(course => {
      const csvCourse = coursesData[course.id];
      const csvChapters = chaptersData[course.id];
      
      // Update course with CSV data if available
      if (csvCourse || csvChapters) {
        return {
          ...course,
          title: csvChapters?.courseName || course.title,
          description: csvCourse?.description || course.description,
          chapters: csvChapters ? this.convertChaptersToMockFormat(csvChapters.chapters) : course.chapters
        };
      }
      
      return course;
    });
  }

  /**
   * Convert CSV chapters to mock data format
   */
  convertChaptersToMockFormat(csvChapters) {
    // Group chapters by main chapter number
    const grouped = {};
    csvChapters.forEach(ch => {
      const mainChapter = ch.chapter ? ch.chapter.split('.')[0] : '1';
      if (!grouped[mainChapter]) {
        grouped[mainChapter] = {
          id: `ch${mainChapter}`,
          title: `Chương ${mainChapter}`,
          lessons: []
        };
      }
      grouped[mainChapter].lessons.push({
        id: ch.id,
        title: ch.title,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
      });
    });
    
    return Object.values(grouped);
  }

  /**
   * Get user data từ CSV
   */
  async getUserData(userId) {
    const userCoursesData = await this.loadUserCoursesData();
    
    if (!userCoursesData || !userCoursesData[userId]) {
      // Return default user data if not found in CSV
      return {
        enrolledCourses: [],
        completedCourses: [],
        progress: {
          overall: 0,
          courses: {}
        }
      };
    }
    
    return userCoursesData[userId];
  }

  /**
   * Validate userId format (U_xxxxx)
   */
  isValidUserId(userId) {
    return typeof userId === 'string' && userId.startsWith('U_');
  }

  /**
   * Get all unique course IDs from user_course_complete.csv
   */
  async getAllCourseIds() {
    const userCoursesData = await this.loadUserCoursesData();
    const courseIds = new Set();
    
    Object.values(userCoursesData || {}).forEach(userData => {
      userData.enrolledCourses.forEach(courseId => courseIds.add(courseId));
    });
    
    return Array.from(courseIds);
  }

  clearCache() {
    console.log("[DataLoader] Clearing all cache...");
    this.cache = {
      courses: null,
      chapters: null,
      userCourses: null,
      users: null
    };
    this.cacheVersion = Date.now(); // Update version to force reload
    console.log("[DataLoader] Cache cleared, new version:", this.cacheVersion);
  }
}

export const dataLoader = new DataLoaderService();
export default dataLoader;
