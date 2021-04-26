import numpy
import random
import json

def generate(population):
    ages = {"ages": []}
    fptxt = open("ageDistributions.txt", "w")
    fpjson = open("ageDistributions.js", "w")
    res = []
    ratio = 0.23
    young = int((1-ratio)*population)
    old = int((ratio)*population)
    i = 0
    while i < young:
        age = int(random.gauss(30, 18))
        if age > 0:
            # res.append(int(age))
            fptxt.write(str(age)+"\n")
            res.append(age)
            i += 1
    i = 0
    while i < old:
        age = int(random.gauss(30, 18))
        if age > 0:
            # res.append(int(age))
            fptxt.write(str(age)+"\n")
            res.append(age)
            i += 1
    #plt.hist(res,bins=[x for x in range(0, 110)])
    # plt.show()
    ages["ages"] = res
    fpjson.write("ageDistributions = " + str(ages))

generate(75000)
