import re

# Read the file
with open('src/pages/LoginPage.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace form section - from {/* Form */} to end of </form>
# Find pattern and replace
pattern = r'{/\* Form \*/}.*?</form>'

replacement = '''{/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      ID Người dùng
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        name="userId"
                        value={userId}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all text-sm"
                        placeholder="Nhập ID người dùng (ví dụ: U_10000)"
                        required
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-500 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                      💡 <strong>Lưu ý:</strong> Chỉ cần nhập User ID (định dạng <code className="font-mono bg-white px-1.5 py-0.5 rounded text-indigo-600 border border-indigo-200">U_xxxxx</code>), không cần mật khẩu
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full btn-primary py-3 font-semibold"
                  >
                    Đăng nhập
                  </button>

                  <div className="text-center text-sm text-slate-600 mt-4 bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                    <p className="font-semibold text-slate-900 mb-2">Ví dụ User ID:</p>
                    <div className="space-y-1 text-xs">
                      <p><code className="font-mono font-semibold text-emerald-700 bg-white px-2 py-1 rounded border border-emerald-200">U_10000</code></p>
                      <p><code className="font-mono font-semibold text-emerald-700 bg-white px-2 py-1 rounded border border-emerald-200">U_100066</code></p>
                      <p><code className="font-mono font-semibold text-emerald-700 bg-white px-2 py-1 rounded border border-emerald-200">U_100090</code></p>
                    </div>
                  </div>
                </form>'''

# Use DOTALL flag to match across newlines
updated_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write back
with open('src/pages/LoginPage.jsx', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("LoginPage.jsx updated successfully!")
print(f"Found and replaced form section")
