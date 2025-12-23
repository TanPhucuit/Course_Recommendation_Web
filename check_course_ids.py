import pandas as pd

# Load files
courses = pd.read_csv('web_data/courses_about.csv')
user_courses = pd.read_csv('web_data/user_course_complete.csv', nrows=1000)

# Extract numeric ID from courses_about
courses['numeric_id'] = courses['id'].str.replace('C_', '').astype(int)

# Check matches
sample_ids = user_courses['course'].unique()[:15]
print('Checking course ID mapping:')
print('-' * 50)
for course_id in sample_ids:
    matching = courses[courses['numeric_id'] == course_id]
    if len(matching) > 0:
        print(f'{course_id:>10} -> {matching.iloc[0]["id"]:>15} ✓ MATCH')
    else:
        print(f'{course_id:>10} -> {"NOT FOUND":>15} ✗')
