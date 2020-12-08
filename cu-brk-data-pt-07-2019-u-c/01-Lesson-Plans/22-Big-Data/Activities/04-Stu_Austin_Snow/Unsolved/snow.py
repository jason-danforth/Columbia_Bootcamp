from mrjob.job import MRJob

class Snow_Days(MRJob):

    def mapper(self, key, line):
        (city, wind_dir, state, day, snow, blank) = line.split(",")
        if snow and int(snow) == 1:
            yield day

    def reducer(self, name, day):
        yield day



if __name__ == "__main__":
    Snow_Days.run()