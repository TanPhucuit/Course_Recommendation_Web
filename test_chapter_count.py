import pandas as pd

# Test tính toán số chapters
print("=== Testing Chapter Calculation Logic ===\n")

# Load course_chapter để đếm chapters
course_chapter = pd.read_csv('public/course_chapter.csv')

# Test với các courses của U_10000
test_courses = ['C_680963', 'C_2033958']

for course_id in test_courses:
    chapters = course_chapter[course_chapter['course_id'] == course_id]
    print(f"\nCourse {course_id}:")
    print(f"  Total rows in course_chapter.csv: {len(chapters)}")
    
    # Check unique chapters
    unique_chapters = chapters['chapter'].unique()
    print(f"  Unique chapter numbers: {len(unique_chapters)}")
    print(f"  Sample chapters: {list(unique_chapters[:5])}")
    
    # Check titles
    print(f"  Sample titles: {list(chapters['titles'].head(3))}")

print("\n=== Summary ===")
print(f"Total courses: {len(test_courses)}")
print(f"Total rows across all test courses: {len(course_chapter[course_chapter['course_id'].isin(test_courses)])}")
