import pandas as pd

# Test xem user U_10000 có courses nào
print("=== Testing User U_10000 Course Data ===\n")

# 1. Load user_course_complete
user_courses = pd.read_csv('public/user_course_complete.csv')
u10000_courses = user_courses[user_courses['user'] == 'U_10000']
print(f"User U_10000 has {len(u10000_courses)} enrolled courses:")
print(u10000_courses.head(10))
print()

# 2. Get course IDs with C_ prefix
course_ids = [f"C_{int(cid)}" for cid in u10000_courses['course'].head(5)]
print(f"First 5 course IDs (with C_ prefix): {course_ids}")
print()

# 3. Check if these courses exist in courses_about
courses_about = pd.read_csv('public/courses_about.csv')
print(f"Total courses in courses_about: {len(courses_about)}")
for cid in course_ids:
    course_info = courses_about[courses_about['id'] == cid]
    if len(course_info) > 0:
        print(f"✓ {cid}: Found in courses_about")
    else:
        print(f"✗ {cid}: NOT found in courses_about")
print()

# 4. Check course_chapter
course_chapter = pd.read_csv('public/course_chapter.csv')
print(f"Total chapters in course_chapter: {len(course_chapter)}")
for cid in course_ids:
    chapters = course_chapter[course_chapter['course_id'] == cid]
    print(f"{cid}: {len(chapters)} chapters")
print()

# 5. Check user info
user_info_0 = pd.read_csv('public/web_data/user_info_parts/user_info_part_0.csv')
u10000_info = user_info_0[user_info_0['user_id'] == 'U_10000']
print("User U_10000 info:")
print(u10000_info)
