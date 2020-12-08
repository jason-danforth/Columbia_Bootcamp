# import necessary libraries
from sqlalchemy import func

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

# @TODO: Setup your database here
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/PETS.sqlite"

db = SQLAlchemy(app)

class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    petName = db.Column(db.String(64))
    petType = db.Column(db.String(64))
    petAge = db.Column(db.Integer)

    def __repr__(self):
        return '<Pet %r>' % (self.petName)

@app.before_first_request
def setup():
    # Recreate database each time for demo
    db.drop_all()
    db.create_all()


@app.route("/")
def home():
    return render_template("index.html")


# @TODO: Create a route "/send" that handles both GET and POST requests
# If the request method is POST, save the form data to the database
# Otherwise, return "form.html"
@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        petName = request.form["petName"]
        petType = request.form["petType"]
        petAge = request.form['petAge']

        pet = Pet(petName = petName, petType = petType, petAge = petAge)
        db.session.add(pet)
        db.seesion.commit()

        return "Thanks for helping us steak your pet data!"

    return render_template("form.html")


# @TODO: Create an API route "/api/pals" to return data to plot
@app.route("/api/pals")
def plot_pets():
    results = db.session.query(Pet.petName, Pet.petType, Pet.petAge).all()

    pets = []
    for result in results:
        pets.append({
            "petName": result[0]
            "petType": result[1]
            "petAge": result[2]
        })
    
    return jsonify(pets)


if __name__ == "__main__":
    app.run()
