from flask import Flask, render_template

app = Flask(__name__)

app.config['postgresql://postgres:Franklin#4@localhost:5432/urban_planning.db]
app.config['SECRET_KEY'] = 'secret'

if __name__ == '__main__':
app.run(debug=True)