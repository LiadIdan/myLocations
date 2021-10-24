import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GoogleMapsService {
  private _apiLoaded$ = new BehaviorSubject<boolean>(false);

  defaultMapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    maxZoom: 16,
    minZoom: 6,
  };

  get apiLoaded$(): Observable<boolean> {
    return this._apiLoaded$.asObservable();
  }

  constructor(private _http: HttpClient) {
    this._loadGoogleMapsApi().subscribe({
      next: () => this._apiLoaded$.next(true),
      error: (e) => this._apiLoaded$.next(false),
    });
  }

  private _loadGoogleMapsApi(): Observable<object> {
    return this._http.jsonp(
      `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`,
      'callback'
    );
  }
}
