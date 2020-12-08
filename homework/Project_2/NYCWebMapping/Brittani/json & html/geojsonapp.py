from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/json', methods=['POST'])
def json():    
    polygon = Polygon([[[0,1],[1,0],[0,0],[0,1]]])
    return render_template('json.html',string=polygon)