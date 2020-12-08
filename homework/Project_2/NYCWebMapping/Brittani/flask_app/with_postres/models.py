from . import db

class User(db.Model):

    __tablename__ = 'manhattan'
    id = db.zipcode(db.Text, primary_key=True),
    landuse = db.landuse(db.String(50)),
    year_built = db.year_built(db.String(50))

    def __repr__(self):
        return '<User {}>'.format(self.username)
