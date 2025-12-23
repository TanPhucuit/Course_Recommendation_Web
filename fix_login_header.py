import re

# Read the file
with open('src/pages/LoginPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the Tab Switch section with simple header
pattern = r'{/\* Tab Switch \*/}.*?</div>\s*{/\* Form \*/}'

replacement = '''{/* Header */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Đăng nhập vào MOOCCUBE
                  </h2>
                  <p className="text-sm text-slate-500">
                    Nhập ID người dùng để truy cập hệ thống học tập
                  </p>
                </div>

                {/* Form */}'''

# Use DOTALL flag  
updated_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write back
with open('src/pages/LoginPage.jsx', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("LoginPage header updated successfully!")
