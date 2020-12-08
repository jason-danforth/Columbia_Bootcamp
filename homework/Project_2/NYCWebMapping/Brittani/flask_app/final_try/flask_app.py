from flask import Flask, render_template, jsonify 

app = Flask(__name__)

@app.route('/zipcode') 
def pandasJSON():
    manhattan_df.to_json(orient='index')
    manhattan_df.set_index('Zipcode', inplace=True)
    result = {}
    for index, row in manhattan_df.iterrows():
        result[index] = dict(row)
    return jsonify(result) 

@app.route('/landuse') 
def pandasJSON():
    manhattan_df.to_json(orient='index')
    manhattan_df.set_index('landuse', inplace=True)
    result = {}
    for index, row in manhattan_df.iterrows():
        result[index] = dict(row)
    return jsonify(result)

@app.route('/yearbuilt') 
def pandasJSON():
    manhattan_df.to_json(orient='index')
    manhattan_df.set_index('year_built', inplace=True)
    result = {}
    for index, row in manhattan_df.iterrows():
        result[index] = dict(row)
    return jsonify(result) 
