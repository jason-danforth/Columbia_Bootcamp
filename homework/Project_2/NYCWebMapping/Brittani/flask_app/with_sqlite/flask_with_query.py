from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template(index.html)


app.route("/zipcode")
def __sql_to_data(sql):
    result = []
    connection = engine.connect()
    try:
        rows = connection.execute(sql)
        for row in rows:
            result_row = {}
            for col in row.keys():
                result_row[str(col)] = str(row[col])
            result.append(result_row)
    finally:
        connection.close()
    return result
