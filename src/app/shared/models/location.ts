export interface Location {
  id: string;
  name: string;
  address: string;
  category: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
