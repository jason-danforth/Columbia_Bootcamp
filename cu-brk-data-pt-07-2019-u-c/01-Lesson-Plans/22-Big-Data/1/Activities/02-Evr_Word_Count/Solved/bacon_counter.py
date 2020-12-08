#mrjob is a python wrapper for Map Reduce so that we can run it easily 
from mrjob.job import MRJob


# create a class that inherits from MRJob
class Bacon_count(MRJob):

    # the class must have "mapper" and "reducer" functions
 
    def mapper(self, _, line):
        for word in line.split():
            if word.lower() == "bacon":
                # yield is just general python, it's a fancy return function like a generator
                # it will return a value without stopping the function
                yield "bacon", 1

    def reducer(self, key, values):
        yield key, sum(values)


# ensure we can call the function from the command line
if __name__ == "__main__":
    Bacon_count.run()
