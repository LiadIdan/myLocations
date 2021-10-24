export interface Location {
  id: string;
  name: string;
  address: string;
  categoryIds: string[];
  coordinates: google.maps.LatLngLiteral;
}

export type CreateLocationDto = Omit<Location, 'id'>;
