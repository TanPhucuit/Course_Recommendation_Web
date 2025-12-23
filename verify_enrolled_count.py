import pandas as pd

print("=== Verifying enrolledCount flow ===\n")

# 1. Check courses_about has user_count
courses = pd.read_csv('public/courses_about.csv')
print(f"1. courses_about.csv columns: {list(courses.columns)}")
print(f"   Has user_count column: {'user_count' in courses.columns}\n")

# 2. Check test courses
test_courses = ['C_680963', 'C_2033958']
for cid in test_courses:
    course_data = courses[courses['id'] == cid]
    if len(course_data) > 0:
        user_count = course_data.iloc[0]['user_count']
        print(f"   {cid}: user_count = {user_count}")
    else:
        print(f"   {cid}: NOT FOUND in courses_about.csv")

print("\n2. Verify dataLoader will parse this correctly:")
print("   enrolledCount = parseInt(course.user_count) || 0")
print(f"   C_680963 → {int(courses[courses['id'] == 'C_680963'].iloc[0]['user_count'])}")
print(f"   C_2033958 → {int(courses[courses['id'] == 'C_2033958'].iloc[0]['user_count'])}")

print("\n✓ Data is ready! If enrolledCount still shows 0, check:")
print("  1. Browser cache - try Ctrl+Shift+R")
print("  2. Console logs for 'Loaded course' messages")
print("  3. Verify getCourseById returns enrolledCount property")
