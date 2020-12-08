* step 1: open command line and type mongo

* create a new db
use travel_db

* Create a collection
db.createCollection("destinations")

* Insert data into the travel_db database with this command. This will also create the collection automatically, the contents of the insert are basically a JavaScript object, and include an array.

db.destinations.insert({"continent": "Africa", "country": "Morocco",
                        "major_cities": ["Casablanca", "Fez", "Marrakech"]})


* View data
db.destinations.find().pretty()

* Find specific data by matching a field.
db.destinations.find({"continent": "Africa"})

* Find specific data by matching an \_id.
db.destinations.find({_id: ObjectId("5416fe1d94bcf86cd785439036")})


* A list of everyone of a certain age.
db.classroom.find({age: 23}).pretty()

* An entry for a single person.
db.classroom.find({name: 'Ricky'}).pretty()

* Update data using `db.[COLLECTION_NAME].update()`
db.destinations.update({"country": "Egypt"}, {$set: {"continent": "Antarctica"}})

* Remove Boppo from the collection
db.divers.remove({"name":"Boppo"})