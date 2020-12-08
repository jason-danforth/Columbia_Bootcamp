from flask import request, render_template, make_response
from datetime import datetime as dt
from flask import current_app as app
from .models import db, User


@app.route('/', methods=['GET'])
def create_user():
    """Create a user."""
    zipcode = request.args.get('zipcode')
    landuse = request.args.get('landuse')
    if zipcode and landuse:
        new_user = User(zipcode=zipcode,
                        landuse=landuse,
                        admin=False)  # Create an instance of the User class
        db.session.add(new_user)  # Adds new User record to database
        db.session.commit()  # Commits all changes
    return make_response(f"{new_user} successfully created!")