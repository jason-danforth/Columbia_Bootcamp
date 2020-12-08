from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import pymongo
import scrape_mars

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/craigslist_app"
# mongo = PyMongo(app)

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn,ConnectTimeoutMS=30000)
db = client.mars_db
coll = db.mars_data_coll


@app.route("/")
def index():
    results = coll.find_one()
    return render_template("index.html", data=results) 
    # results is the query result, there's only one (the dict created by scrape())
    # data is passed as a variable into the html
    print("Is this thing on?", flush=True)

@app.route("/scrape")
def scraper():
    # the scrape() func will return a dictionary that we add to the colleciton on the next line
    data_dict = scrape_mars.scrape()
    
    # this step adds data_dict to the collection
    coll.update_many({"id": 1}, {"$set": data_dict}, upsert=True)
    return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)
