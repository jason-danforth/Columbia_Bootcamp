from flask import Flask
from flask import render_template
import itertools

app = Flask(__name__)

@app.route("/geojson")
def home():
    return render_template("index.html")

t = {"type": "FeatureCollection", "features": [{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[-74.000457,40.678994],[-74.000412,40.678982],[-74.000539,40.678719],[-74.000606,40.678738],[-74.000479,40.679001],[-74.000457,40.678994]]]]},"properties":{"address":"37 4 PLACE","bbl":3003700040,"borocode":3,"borough":"BK","landuse":"02","numfloors":2,"yearbuilt":1899,"zipcode":11231}}]
}

features = []
for k,v in itertools.groupby([x for x in t['features'] if not x['features']['borough'] == 'MN' ]):  #filter out manhattan
    features.append(k)
t['features'] = features

if __name__ == "__main__":
    app.run(debug=True)

