export const generateTimeline = (stops: any[]) => {
  return stops.sort((a, b) => a.order - b.order).map(stop => ({
    city: stop.cityId.name,
    country: stop.cityId.country,
    arrival: stop.arrivalDate,
    departure: stop.departureDate,
    notes: stop.notes
  }));
};
