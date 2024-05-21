import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private http = inject(HttpClient);
  private placesApi = inject(PlacesApiClient);
  private mapService = inject(MapService);

  public userLocation: [number, number] | undefined = undefined;


  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];


  get isUserLocationReady(): boolean{

    //SI EXISTE LA LOCATION DEL USUARIO
    return !!this.userLocation;

  }

  constructor(){

    this.getUserLocation();

  }

  public async getUserLocation(): Promise<[number, number]>{

    return new Promise( (resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          // resolve([coords.longitude, coords.latitude])
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
          
        },
        (err) => {
          alert('No se pudo obtener la geolocalizacion');
          console.log(err);
          reject();
        }
      );

    })

  }

  getPlacesByQuery(query:string = ''){

    if(query.length === 0){
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if(!this.userLocation) throw Error('No hay UserLocation');

    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`?q=${query}`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
      .subscribe(resp => {
        // console.log(resp.features)
        this.isLoadingPlaces = false;
        this.places = resp.features;
        this.mapService.createMarkersFromPlaces(this.places, this.userLocation!);
      });
  

    // this.http.get<PlacesResponse>(`https://api.mapbox.com/search/geocode/v6/forward?q=${query}&country=co&proximity=-74.09075642759323%2C4.50164479968474&language=es&access_token=pk.eyJ1IjoiY3Jpc3RpYW5ob3J0dWEiLCJhIjoiY2x2ZzV5eWZuMHJyMjJ2cDRxeXAwNzVtMCJ9.MTSbnGA70LiSNGqsJiwP8g`)
    //   .subscribe(resp => {
    //     console.log(resp.features)
    //     this.isLoadingPlaces = false;
    //     this.places = resp.features;
    //   });

  }

  deletePlaces(){
    this.places = [];
  }


}
