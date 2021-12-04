import promptSync from "prompt-sync";
import { Ride } from "./Ride.js";
import { SearchRide } from "./SearchRide.js";

export function validateIsDate(dateAsString) {
  var date = new Date(dateAsString);
  if (isNaN(date.getTime())) {
    return false;
  } else {
    return true;
  }
}

export function validateIsPositiveInt(numOfSeatsStr) {
  var numOfSeats = Number(numOfSeatsStr);
  if (isNaN(numOfSeats)) {
    return false;
  } else if (numOfSeats < 0) {
    return false;
  }

  return true;
}

export function createNewRide(inputArray) {
  var numberOfSeats = parseInt(inputArray[3]);
  var newRide = new Ride(
    inputArray[0],
    inputArray[1],
    inputArray[2],
    numberOfSeats
  );
  return newRide;
}

export function createReturnRide(rides, inputArray) {
  if (rides.length > 0) {
    var dateStr = inputArray[0];

    if (validateIsDate(dateStr)) {
      var lastRideEntered = rides[rides.length - 1];
      var returnRide = new Ride(
        lastRideEntered.Destination,
        lastRideEntered.Departure,
        dateStr,
        lastRideEntered.NumberOfSeats
      );
      return returnRide;
    } else {
      console.log("Error! Wrong date format.");
    }
  } else {
    console.log(
      "Error! Create a new ride before you can create a return ride:"
    );
  }
}

export function createSearchRide(inputArray) {
  var searchRide = new SearchRide();

  inputArray.forEach((str) => {
    if (validateIsPositiveInt(str)) {
      searchRide.MinimumNumOfFreeSeats = parseInt(str);
    } else if (validateIsDate(str)) {
      if (searchRide.SearchStartDate != "") {
        searchRide.SearchEndDate = str;
      } else {
        searchRide.SearchStartDate = str;
      }
    } // It is a City
    else {
      if (searchRide.Departure != "") {
        searchRide.Destination = str;
      } else {
        searchRide.Departure = str;
      }
    }
  });

  return searchRide;
}

export function searchRidesRecursive(
  rides,
  searchRide,
  searchFields,
  indexToRemove
) {
  if (rides.length < 1) {
    console.log("No rides matched search criteria.");
    return [];
  }
  if (searchFields.length < 1) {
    //Stop recursion when searchFields are empty
    return indexToRemove;
  }

  var searchField = searchFields[searchFields.length - 1];

  switch (searchField) {
    case "Departure":
    case "Destination":
      if (searchFields.includes("Destination")) {
        rides.forEach((ride) => {
          if (
            ride.Destination.toLowerCase() !=
            searchRide.Destination.toLowerCase()
          ) {
            indexToRemove.push(rides.indexOf(ride));
          }
        });
        searchFields.pop();
      } else {
        rides.forEach((ride) => {
          if (
            ride.Departure.toLowerCase() != searchRide.Departure.toLowerCase()
          ) {
            indexToRemove.push(rides.indexOf(ride));
          }
        });

        searchFields.pop();
      }
      break;
    case "SearchStartDate":
    case "SearchEndDate":
      if (searchFields.includes("SearchEndDate")) {
        rides.forEach((ride) => {
          if (
            searchRide.SearchEndDate < ride.Date ||
            searchRide.SearchStartDate > ride.Date
          ) {
            indexToRemove.push(rides.indexOf(ride));
          }
        });

        searchFields.pop();
      } else {
        rides.forEach((ride) => {
          if (searchRide.SearchStartDate === ride.Date) {
            indexToRemove.push(rides.indexOf(ride));
          }
        });

        searchFields.pop();
      }
      break;

    case "MinimumNumOfFreeSeats":
      rides.forEach((ride) => {
        if (searchRide.MinimumNumOfFreeSeats > ride.NumberOfSeats) {
          indexToRemove.push(rides.indexOf(ride));
        }
      });

      searchFields.pop();

      break;
  }

  return searchRidesRecursive(rides, searchRide, searchFields, indexToRemove);
}

export function searchRides(rides, inputArray) {
  if (rides.length < 1) {
    console.log("Error! No rides created. Create a new ride to continue:");
  } else {
    var searchRide = createSearchRide(inputArray);
    var searchStartDate = searchRide.SearchStartDate;
    var searchEndDate = searchRide.SearchEndDate;
    var departure = searchRide.Departure;
    var destination = searchRide.Destination;
    var numOfFreeSeats = searchRide.MinimumNumOfFreeSeats;
    var searchFields = [];

    if (departure != "") {
      searchFields.push("Departure");
    }
    if (destination != "") {
      searchFields.push("Destination");
    }
    if (searchStartDate != "") {
      searchFields.push("SearchStartDate");
    }
    if (searchEndDate != "") {
      searchFields.push("SearchEndDate");
    }
    if (numOfFreeSeats != 0) {
      searchFields.push("MinimumNumOfFreeSeats");
    }

    var indexToRemove = searchRidesRecursive(
      rides,
      searchRide,
      searchFields,
      []
    );

    rides.forEach((ride) => {
      if (!indexToRemove.includes(rides.indexOf(ride))) {
        console.log(ride.toString());
      }
    });
  }
}

function main() {
  const prompt = promptSync();
  console.log("GoMore Competitor start");

  var input = "";
  var rides = [];

  do {
    input = prompt(
      "Add ride: C, add return ride: R, search rides: S, main menu: 'exit': "
    );
    var inputArray = input.split(" ");
    var cmd = inputArray.shift().toLowerCase();

    if (cmd === "c") {
      var newRide = createNewRide(inputArray);
      rides.push(newRide);
    } else if (cmd === "r") {
      var newReturnRide = createReturnRide(rides, inputArray);
      rides.push(newReturnRide);
    } else if (cmd === "s") {
      searchRides(rides, inputArray);
    }
  } while (input !== "exit");

  console.log("Bye..");
}

main();
