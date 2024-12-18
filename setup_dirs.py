import os

# 创建必要的目录
os.makedirs('static', exist_ok=True)
os.makedirs('templates', exist_ok=True)

# 移动文件到正确的位置
if os.path.exists('index.html'):
    os.rename('index.html', 'templates/index.html')
if os.path.exists('style.css'):
    os.rename('style.css', 'static/style.css')
if os.path.exists('script.js'):
    os.rename('script.js', 'static/script.js')
