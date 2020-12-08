
# OPEN FILES
with open('input.txt', 'r') as textfile:
    print(textfile)
    print("\n")
    print(textfile.read())






# IMPORTING MODULES
import random
import string

# Utilize the string module's custom method: ".ascii_letters"
print(string.ascii_letters)

# Utilize the random module's custom method randint
for x in range(10):
    print(random.randint(1, 10))





#READ CSV

# First we'll import the os module
# This will allow us to create file paths across operating systems
import os

# Module for reading CSV files
import csv

csvpath = os.path.join('..', 'Resources', 'accounting.csv') #b/c this is OS independent, it will know whether to put a / or \ between each element of the path

# # Method 1: Plain Reading of CSV files
# with open(csvpath, 'r') as file_handler:
#     lines = file_handler.read()
#     print(lines)
#     print(type(lines))


# Method 2: Improved Reading using CSV module

with open(csvpath, newline='') as csvfile:

    # CSV reader specifies delimiter and variable that holds contents
    csvreader = csv.reader(csvfile, delimiter=',')

    print(csvreader)

    # Read the header row first (skip this step if there is now header)
    csv_header = next(csvreader)
    print(f"CSV Header: {csv_header}")

    # Read each row of data after the header
    for row in csvreader:
        print(row)

    #csvreader is a generator object, so it will remember what line you're on. By using next you pull out the first line
    #that way, when you run the for loop to read the rows, you're already skipping the first row