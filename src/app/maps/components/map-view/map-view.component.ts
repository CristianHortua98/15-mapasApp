import { Component, AfterViewInit, inject, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit{

  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  
  private placesService = inject(PlacesService);
  private mapService = inject(MapService);
  
  ngAfterViewInit(): void {

    if(!this.placesService.userLocation) throw Error('No hay placesServices.userLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    })

    const popup = new Popup()
      .setHTML(`
        <h6>Aqui Estoy</h6>
        <span>Estoy en este lugar del mundo.</span>
      `);

    new Marker({color: 'red'})
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap(map);

  }
  
}
