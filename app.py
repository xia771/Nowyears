from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

# 将静态文件移动到static文件夹
app.static_folder = 'static'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                             'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
