import pandas as pd
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template, redirect, request

app = Flask(__name__)

# Initialize data
values = {"value_type": "landuse", "zipcode": "10001", "values": []}



@app.route("/")
def welcome():

    engine = create_engine("sqlite:///plutoDB.sqlite")
    conn = engine.connect()

    # Query
    zip = values["zipcode"]
    val = values["value_type"]
    results = pd.read_sql(f"SELECT {val} FROM pluto_table WHERE zipcode = {zip}", conn)
    results_list = results.iloc[:, 0].tolist()

    # Update values
    values["values"] = results_list

    # Render index and pass values
    return render_template("index.html", data=values) 



@app.route("/api/value_type/<value_type>", methods=["POST"])
def updateVal(value_type):

    engine = create_engine("sqlite:///plutoDB.sqlite")
    conn = engine.connect()

    # Query
    zip = values["zipcode"] # zipcode is already present, so pull it from the values dict, and query based on new value_type
    results = pd.read_sql(f"SELECT {value_type} FROM pluto_table WHERE zipcode = {zip}", conn)
    results_list = results.iloc[:, 0].tolist()

    # Update values
    values["value_type"] = str(value_type)    
    values["values"] = results_list

    return values
    #return redirect("/", code=302) 



@app.route("/api/zipcode/<zipcode>", methods=["POST"])
def updateZip(zipcode):

    engine = create_engine("sqlite:///plutoDB.sqlite")
    conn = engine.connect()

    # Query
    val = values["value_type"] # value_type is already present, so pull it from the values dict, and query based on new zipcode
    results = pd.read_sql(f"SELECT {val} FROM pluto_table WHERE zipcode = {zipcode}", conn)
    results_list = results.iloc[:, 0].tolist()

    # Update values
    values["zipcode"] = str(zipcode)    
    values["values"] = results_list

    return values
    #return jsonify(values) 


if __name__ == '__main__':
    app.run(debug=True)