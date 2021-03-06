# CouchImport 

## Introduction

When populating CouchDB databases, often the source of the data is initially a CSV or TSV file. CouchImport is designed to assist you with importing flat data into CouchDB efficiently.

* simply pipe the data file to 'couchimport' on the command line
* handles tab or comma separated data
* uses Node.js's streams for memory efficiency
* plug in a custom function to add your own changes before the data is written
* writes the data in bulk for speed

![schematic](https://github.com/glynnbird/couchimport/raw/master/images/couchimport.png "Schematic Diagram")

## Installation

Requirements
* node.js
* npm

```
  sudo npm install -g couchimport
```

## Configuration

CouchImport's configuration parameters are stored in environment variables.

### The location of CouchDB - default "http://localhost:5984"

Simply set the "COUCH_URL" environment variable e.g. for a hosted Cloudant database

```
  export COUCH_URL="https://myusername:myPassw0rd@myhost.cloudant.com"

```
or a local CouchDB installation:

```
  export COUCH_URL="http://localhost:5984"
```

### The name of the database - default "test"

Define the name of the CouchDB database to write to by setting the "COUCH_DATABSE" environment variable e.g.

```
  export COUCH_DATABASE="mydatabase"
```

### Transformation function - default nothing

Define the path of a file containing a transformation function e.g. 

```
  export COUCH_TRANSFORM="/home/myuser/transform.js"
```

The file should: 
* be a javascript file 
* export one function that takes a single doc and returns the transformed version synchronously

(see examples directory). N.B it's best to use full paths for the transform function.

### Delimiter - default "/t"

The define the column delimiter in the input data e.g. 

```
  export COUCH_DELIMETER=","
```

## Running

Simply pipe the text data into "couchimport":

```
  cat ~/test.tsv | couchimport
```

This example downloads public crime data, unzips and imports it:

```
  curl 'http://data.octo.dc.gov/feeds/crime_incidents/archive/crime_incidents_2013_CSV.zip' > crime.zip
  unzip crime.zip
  export COUCH_DATABASE="crime_2013"
  export COUCH_DELIMETER=","
  ccurl -X PUT /crime_2013
  cat crime_incidents_2013_CSV.csv | couchimport
```

In the above example we use "(ccurl)[https://github.com/glynnbird/ccurl]" a command-line utility that uses the same environment variables as "couchimport".

## Output

The following output is visible on the console when "couchimport" runs:

```
******************
 COUCHIMPORT - configuration
   {"COUCH_URL":"https://****:****@myhost.cloudant.com","COUCH_DATABASE":"aaa","COUCH_TRANSFORM":null,"COUCH_DELIMETER":","}
******************
Written 500  ( 500 )
Written 500  ( 1000 )
Written 500  ( 1500 )
Written 500  ( 2000 )
.
.

```

The configuration, whether default or overriden from environment variables is show, followed by a line of output for each block of 500 documents written, plus a cumulative total.
