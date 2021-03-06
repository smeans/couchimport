var theconfig = {};

// configure the CouchDB paramss
theconfig.COUCH_URL = "http://localhost:5984";
theconfig.COUCH_DATABASE = "test";
theconfig.COUCH_TRANSFORM = null;
theconfig.COUCH_DELIMETER = "\t";

// if we have a custom CouchDB url
if( typeof process.env.COUCH_URL != "undefined") {
  theconfig.COUCH_URL = process.env.COUCH_URL;
}

// if we have a custom CouchDB url
if( typeof process.env.COUCH_DATABASE != "undefined") {
  theconfig.COUCH_DATABASE = process.env.COUCH_DATABASE;
}

// if we have a customised transformation function
if( typeof process.env.COUCH_TRANSFORM != "undefined") {

  theconfig.COUCH_TRANSFORM = require(process.env.COUCH_TRANSFORM)
}

// if we have overridden the delimeter field
if( typeof process.env.COUCH_DELIMETER != "undefined") {
  theconfig.COUCH_DELIMETER = process.env.COUCH_DELIMETER;
}

console.log("******************");
console.log(" COUCHIMPORT - configuration")
console.log("  ", JSON.stringify(theconfig, null, ' ').replace(/\/\/.+@/g, "//****:****@"));
console.log("******************")

module.exports = theconfig;