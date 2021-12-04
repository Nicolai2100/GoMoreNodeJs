export class Ride {
  constructor(departure, destination, date, numberOfSeats) {
    this.Departure = departure;
    this.Destination = destination;
    this.Date = date;
    this.NumberOfSeats = numberOfSeats;
  }

  toString() {
    return `${this.Departure} ${this.Destination} ${this.Date} ${this.NumberOfSeats}`;
  }
}
