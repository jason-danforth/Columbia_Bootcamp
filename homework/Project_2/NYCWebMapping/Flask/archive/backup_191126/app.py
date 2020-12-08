import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify


# Database Setup
engine = create_engine("sqlite:///plutoDB.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Flask Setup
app = Flask(__name__)

# Flask Routes


@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/value type/zipcode"
    )


@app.route("/api/<value_type>/<zip_code>")
def end(value_type, zip_code):
    
    # Create session and save reference to table
    session = Session(engine)
    #Pluto = Base.classes.PLUTO
    Pluto = Base.classes.pluto_table

    # Query
    data = session.query(Pluto[value_type]).filter(Pluto.zipcode == zip_code).all()


    value_list = []
    for row in data:
        value_list.append(row._asdict())
    
    return jsonify(value_list)

    session.close()




'''
@app.route("/api/v1.0/precipitation")
def prcp():
    """List prcp averages for all dates""" 
    
    # Create session and save reference to table
    session = Session(engine)
    Measurement = Base.classes.measurement

    # Query
    prcp_query = session.query(Measurement.date, func.avg(Measurement.prcp).label('prcp')).group_by(Measurement.date)
    
    prcp_list = []
    for row in prcp_query:
        prcp_list.append(row._asdict())
    
    return jsonify(prcp_list)

    session.close()


@app.route("/api/v1.0/stations")
def stations():
    """List Stations""" 
    
    # Create session and save reference to table
    session = Session(engine)
    Station = Base.classes.station

    # Query
    stations_query = session.query(Station.name).group_by(Station.name)
    
    stations_list = []
    for row in stations_query:
        stations_list.append(row._asdict())
    
    return jsonify(stations_list)

    session.close()


@app.route("/api/v1.0/tobs")
def temps():
    """List tobs for last year""" 
    
    # Create session and save reference to table
    session = Session(engine)
    Measurement = Base.classes.measurement

    # Query
    tobs_query = session.query(Measurement.date, func.avg(Measurement.tobs).label('tobs'))\
        .filter(Measurement.date >= '2016-08-23').group_by(Measurement.date)
    
    tobs_list = []
    for row in tobs_query:
        tobs_list.append(row._asdict())
    
    return jsonify(tobs_list)

    session.close()


@app.route("/api/v1.0/<start_date>")
def start(start_date):
    """List min, max, avg temps for dates after start""" 
    
    # Create session and save reference to table
    session = Session(engine)
    Measurement = Base.classes.measurement

    # Query
    start_query = session.query(func.avg(Measurement.tobs).label('average'), func.min(Measurement.tobs).label('min'), func.max(Measurement.tobs).label('max'))\
        .filter(Measurement.date >= start_date).all()

    start_list = []
    for row in start_query:
        start_list.append(row._asdict())
    
    return jsonify(start_list)

    session.close()
'''





if __name__ == '__main__':
    app.run(debug=True)