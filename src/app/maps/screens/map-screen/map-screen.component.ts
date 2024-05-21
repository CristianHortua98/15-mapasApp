import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.css'
})
export class MapScreenComponent {

  private placesService = inject(PlacesService);

  get isUserLocationReady(){

    return this.placesService.isUserLocationReady;

  }

}
