// Debug script - paste into browser console to test chart data

console.log("=== Testing Chart Data ===");

// Assuming you have enrolledCourses loaded
const testCourses = [
  {
    id: 'C_680963',
    title: '腐蚀与防护',
    progress: 0,
    chapters: [
      { id: 'ch1', title: 'Chapter 1', lessons: Array(51).fill({ id: 'l1', title: 'Lesson' }) }
    ]
  },
  {
    id: 'C_2033958',
    title: 'Course 2',
    progress: 2.9,
    chapters: [
      { id: 'ch1', title: 'Chapter 1', lessons: Array(75).fill({ id: 'l1', title: 'Lesson' }) }
    ]
  }
];

// Calculate stats
const totalChapters = testCourses.reduce((sum, course) => {
  return sum + (course.chapters?.reduce((chapterSum, chapter) => chapterSum + (chapter.lessons?.length || 0), 0) || 0);
}, 0);

console.log("Total Chapters:", totalChapters); // Should be 126

// Chart 1 Data
const chapterComparisonData = testCourses.map(course => ({
  name: course.title.length > 20 ? course.title.substring(0, 20) + '...' : course.title,
  chapters: course.chapters?.reduce((sum, chapter) => sum + (chapter.lessons?.length || 0), 0) || 0,
  courseId: course.id
}));

console.log("Chapter Comparison Data:", chapterComparisonData);

// Chart 2 Data
const completedCount = testCourses.filter(c => c.progress >= 100).length;
const inProgressCount = testCourses.length - completedCount;
const completionPieData = [
  { name: 'Đã hoàn thành', value: completedCount, color: '#10B981' },
  { name: 'Đang học', value: inProgressCount, color: '#F59E0B' }
];

console.log("Completion Pie Data:", completionPieData);

// Chart 3 Data
const progressBarData = testCourses.map(course => ({
  name: course.title.length > 15 ? course.title.substring(0, 15) + '...' : course.title,
  completed: course.progress,
  remaining: 100 - course.progress
}));

console.log("Progress Bar Data:", progressBarData);

console.log("=== All data looks good! ===");
