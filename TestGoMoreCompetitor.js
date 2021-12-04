import {
  createNewRide,
  createReturnRide,
  searchRides,
} from "./GoMoreCompetitor.js";

var createInput1 = "C Odense Copenhagen 2018-10-01 4";
var createInput2 = "C Copenhagen Aarhus 2018-10-01 2";
var createInput3 = "C Odense Copenhagen 2018-10-02 1";

var searchInput1 = "S Odense Copenhagen 2018-10-01";
var searchInput2 = "S Odense Copenhagen 2018-10-01 2018-10-03";
var searchInput3 = "S Odense Copenhagen 2018-10-01 2018-10-03 2";
var searchInput4 = "S Copenhagen Odense";

var returnInput1 = "R 2018-10-03";
var rides = [];

var createInput1Arr = createInput1.split(" ");
createInput1Arr.shift();
var ride1 = createNewRide(createInput1Arr)
rides.push(ride1);

var createInput2Arr = createInput2.split(" ");
createInput2Arr.shift();
rides.push(createNewRide(createInput2Arr));

var createInput3Arr = createInput3.split(" ");
createInput3Arr.shift();
rides.push(createNewRide(createInput3Arr));

var searchInput1Arr = searchInput1.split(" ");
searchInput1Arr.shift();
searchRides(rides, searchInput1Arr);

var searchInput2Arr = searchInput2.split(" ");
searchInput2Arr.shift();
searchRides(rides, searchInput2Arr);

var searchInput3Arr = searchInput3.split(" ");
searchInput3Arr.shift();
searchRides(rides, searchInput3Arr);

var returnInput1Arr = returnInput1.split(" ");
returnInput1Arr.shift();
rides.push(createReturnRide(rides, returnInput1Arr));

var searchInput4Arr = searchInput4.split(" ");
searchInput4Arr.shift();
searchRides(rides, searchInput4Arr);
