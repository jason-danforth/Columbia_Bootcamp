# import necessary libraries
from flask import (
    Flask,
    render_template,
    jsonify,
    request)
    
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


app = Flask(__name__)


@app.route("/")
def home():
    return "Welcome!"


# Create a list to hold our data
my_data = []


@app.route("/api/data")
def data():
    print(my_data)
    return jsonify(my_data)


@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        nickname = request.form["nickname"]
        age = request.form["age"]

        form_data = {
            "nickname": nickname,
            "age": int(age)
        }

        my_data.append(form_data)

        return "Thanks for the form data!"

    return render_template("form.html") 
    # This will run first. When you manually nagivate to the /send URL it's a "GET" request
    # The "submit" type object in form.html will trigger a "POST" request when clicked


if __name__ == "__main__":
    app.run(debug=True)
