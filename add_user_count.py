import pandas as pd

print("=== Adding user_count column to courses_about.csv ===\n")

# 1. Load user_course_complete to count users per course
print("1. Loading user_course_complete.csv...")
user_courses = pd.read_csv('public/user_course_complete.csv')

# 2. Count users per course (group by course, count unique users)
print("2. Counting users per course...")
course_counts = user_courses.groupby('course')['user'].nunique().reset_index()
course_counts.columns = ['course', 'user_count']

# Add C_ prefix to course IDs
course_counts['course'] = 'C_' + course_counts['course'].astype(str)

print(f"   Found {len(course_counts)} courses with user counts")
print(f"   Sample:\n{course_counts.head()}\n")

# 3. Load courses_about.csv
print("3. Loading courses_about.csv...")
courses = pd.read_csv('public/courses_about.csv')
print(f"   Original columns: {list(courses.columns)}")
print(f"   Total courses: {len(courses)}\n")

# 4. Merge to add user_count column
print("4. Merging user_count into courses_about...")
# Rename 'course' to 'id' for merge
course_counts.rename(columns={'course': 'id'}, inplace=True)

# Drop existing user_count column if it exists
if 'user_count' in courses.columns:
    print("   Dropping existing user_count column...")
    courses = courses.drop(columns=['user_count'])

# Merge
courses_updated = courses.merge(course_counts[['id', 'user_count']], on='id', how='left')

# Fill NaN with 0
courses_updated['user_count'] = courses_updated['user_count'].fillna(0).astype(int)

print(f"   New columns: {list(courses_updated.columns)}")
print(f"   Courses with user_count > 0: {(courses_updated['user_count'] > 0).sum()}\n")

# 5. Verify test courses
print("5. Verifying test courses:")
for cid in ['C_680963', 'C_2033958']:
    count = courses_updated[courses_updated['id'] == cid]['user_count'].values
    if len(count) > 0:
        print(f"   {cid}: {count[0]} users")
    else:
        print(f"   {cid}: NOT FOUND")
print()

# 6. Save updated CSV to BOTH locations
print("6. Saving updated courses_about.csv...")
courses_updated.to_csv('public/courses_about.csv', index=False)
print("   ✓ Saved to public/courses_about.csv")

try:
    courses_updated.to_csv('web_data/courses_about.csv', index=False)
    print("   ✓ Saved to web_data/courses_about.csv")
except Exception as e:
    print(f"   ⚠ Could not save to web_data/ (file may be in use): {e}")
print()

print("=== Summary ===")
print(f"Total courses: {len(courses_updated)}")
print(f"Courses with enrollments: {(courses_updated['user_count'] > 0).sum()}")
print(f"Max enrollments: {courses_updated['user_count'].max()}")
print(f"\nTop 5 courses by enrollment:")
print(courses_updated.nlargest(5, 'user_count')[['id', 'user_count']])
