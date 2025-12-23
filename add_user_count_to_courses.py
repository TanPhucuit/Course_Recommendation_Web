import pandas as pd

print("=== Adding user_count column to courses_about.csv ===\n")

# 1. Load courses_about.csv
courses_about = pd.read_csv('public/courses_about.csv')
print(f"Loaded courses_about.csv: {len(courses_about)} courses")
print(f"Existing columns: {list(courses_about.columns)}")

# Drop user_count if it exists
if 'user_count' in courses_about.columns:
    courses_about = courses_about.drop(columns=['user_count'])
    print("Dropped existing user_count column")

# 2. Load user_course_complete.csv
user_course_complete = pd.read_csv('public/user_course_complete.csv')
print(f"Loaded user_course_complete.csv: {len(user_course_complete)} records")

# 3. Convert course IDs to C_xxxxx format for matching
user_course_complete['course_id'] = 'C_' + user_course_complete['course'].astype(str)

# 4. Count unique users per course
user_counts = user_course_complete.groupby('course_id')['user'].nunique().reset_index()
user_counts.columns = ['id', 'user_count']

print(f"\nCalculated user counts for {len(user_counts)} courses")
print(f"Sample user counts:")
print(user_counts.head(10))

# 5. Merge with courses_about
courses_about_updated = courses_about.merge(user_counts, on='id', how='left')

print(f"\nAfter merge, columns: {list(courses_about_updated.columns)}")
print(f"Sample merged data:")
print(courses_about_updated[['id', 'user_count']].head(10))

# Fill NaN with 0 for courses with no users
courses_about_updated['user_count'] = courses_about_updated['user_count'].fillna(0).astype(int)

# 6. Save updated CSV
courses_about_updated.to_csv('public/courses_about.csv', index=False)
print(f"\n✓ Updated courses_about.csv with user_count column")

# 7. Verify
print(f"\nVerification:")
print(f"Total courses: {len(courses_about_updated)}")
print(f"Courses with users: {len(courses_about_updated[courses_about_updated['user_count'] > 0])}")
print(f"Courses without users: {len(courses_about_updated[courses_about_updated['user_count'] == 0])}")

print("\nTop 10 courses by user count:")
top_courses = courses_about_updated.nlargest(10, 'user_count')[['id', 'user_count']]
print(top_courses)

print("\n=== Done! ===")
