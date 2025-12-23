import Papa from 'papaparse';

/**
 * Service để load và parse các file CSV từ web_data
 */
class CSVLoaderService {
  constructor() {
    this.basePath = '/web_data';
    this.cache = {
      users: null,
      courses: null,
      chapters: null,
      userCourses: null
    };
  }

  /**
   * Load file CSV và parse thành array of objects
   */
  async loadCSV(filename) {
    try {
      const response = await fetch(`${this.basePath}/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}`);
      }
      const csvText = await response.text();
      
      return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            resolve(results.data);
          },
          error: (error) => {
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      throw error;
    }
  }

  /**
   * Load thông tin users từ user_info.csv
   * Note: File quá lớn (>50MB), sẽ chỉ load khi cần thiết hoặc dùng alternative approach
   */
  async loadUsers() {
    if (this.cache.users) return this.cache.users;
    
    // Vì file user_info.csv quá lớn, ta sẽ tạo mock users hoặc load từ server
    // Tạm thời return empty array, sẽ authenticate bằng cách check format userId
    this.cache.users = [];
    return this.cache.users;
  }

  /**
   * Load thông tin courses từ courses_about.csv
   */
  async loadCourses() {
    if (this.cache.courses) return this.cache.courses;
    
    try {
      const coursesData = await this.loadCSV('courses_about.csv');
      // Transform data: { id, about } => { id, description }
      this.cache.courses = coursesData.map(course => ({
        id: course.id,
        description: course.about,
        title: `Khóa học ${course.id}`, // Placeholder, có thể extract từ chapters
        category: 'General',
        enrollmentCount: 0
      }));
      return this.cache.courses;
    } catch (error) {
      console.error('Error loading courses:', error);
      return [];
    }
  }

  /**
   * Load chi tiết chapters từ course_chapter.csv
   */
  async loadChapters() {
    if (this.cache.chapters) return this.cache.chapters;
    
    try {
      const chaptersData = await this.loadCSV('course_chapter.csv');
      // Group by course_id
      this.cache.chapters = this.groupChaptersByCourse(chaptersData);
      return this.cache.chapters;
    } catch (error) {
      console.error('Error loading chapters:', error);
      return {};
    }
  }

  /**
   * Load user-course interactions từ user_course_complete.csv
   */
  async loadUserCourses() {
    if (this.cache.userCourses) return this.cache.userCourses;
    
    try {
      const userCoursesData = await this.loadCSV('user_course_complete.csv');
      // Group by user
      this.cache.userCourses = this.groupUserCourses(userCoursesData);
      return this.cache.userCourses;
    } catch (error) {
      console.error('Error loading user courses:', error);
      return {};
    }
  }

  /**
   * Group chapters theo course_id
   */
  groupChaptersByCourse(chaptersData) {
    const grouped = {};
    chaptersData.forEach(chapter => {
      const courseId = chapter.course_id;
      if (!grouped[courseId]) {
        grouped[courseId] = {
          courseName: chapter.course_name,
          chapters: []
        };
      }
      grouped[courseId].chapters.push({
        title: chapter.titles,
        chapter: chapter.chapter
      });
    });
    return grouped;
  }

  /**
   * Group user courses theo user id
   */
  groupUserCourses(userCoursesData) {
    const grouped = {};
    userCoursesData.forEach(item => {
      const userId = item.user;
      const courseId = item.course;
      const interact = parseFloat(item.interact) || 0;
      
      if (!grouped[userId]) {
        grouped[userId] = [];
      }
      
      grouped[userId].push({
        courseId: courseId,
        progress: interact,
        isCompleted: interact >= 1.0
      });
    });
    return grouped;
  }

  /**
   * Lấy courses của một user cụ thể
   */
  async getUserCourses(userId) {
    const userCourses = await this.loadUserCourses();
    return userCourses[userId] || [];
  }

  /**
   * Lấy chi tiết course với chapters
   */
  async getCourseDetail(courseId) {
    const [courses, chapters] = await Promise.all([
      this.loadCourses(),
      this.loadChapters()
    ]);
    
    const course = courses.find(c => c.id === courseId);
    const courseChapters = chapters[courseId];
    
    if (!course) return null;
    
    return {
      ...course,
      title: courseChapters?.courseName || course.title,
      chapters: courseChapters?.chapters || []
    };
  }

  /**
   * Lấy danh sách courses mà user đã enroll với progress
   */
  async getUserEnrolledCourses(userId) {
    const [userCourses, allCourses, chapters] = await Promise.all([
      this.getUserCourses(userId),
      this.loadCourses(),
      this.loadChapters()
    ]);
    
    return userCourses.map(uc => {
      const course = allCourses.find(c => c.id === uc.courseId);
      const courseChapters = chapters[uc.courseId];
      
      return {
        ...course,
        title: courseChapters?.courseName || course?.title || `Khóa học ${uc.courseId}`,
        progress: Math.round(uc.progress * 100),
        isCompleted: uc.isCompleted,
        chapterCount: courseChapters?.chapters?.length || 0
      };
    }).filter(c => c.id); // Filter out null courses
  }

  /**
   * Validate userId format
   */
  isValidUserId(userId) {
    // User ID format: U_xxxxx
    return typeof userId === 'string' && userId.startsWith('U_');
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache = {
      users: null,
      courses: null,
      chapters: null,
      userCourses: null
    };
  }
}

export const csvLoader = new CSVLoaderService();
export default csvLoader;
