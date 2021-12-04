export class SearchRide {
  constructor() {
    this.Departure = "";
    this.Destination = "";
    this.Date = "";
    this.NumberOfSeats = 0;
  }

  toString() {
    return `${This.Departure} ${this.Destination} ${this.SearchStartDate} ${this.SearchEndDate} ${this.MinimumNumOfFreeSeats}`;
  }
}
