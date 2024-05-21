import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  private mapService = inject(MapService);
  private placesService = inject(PlacesService);

  goToMyLocation():void{

    if(!this.placesService.userLocation) throw Error('No hay ubicacion de usuario');
    if(!this.mapService.isMapReady) throw Error('No hay mapa disponible');

    this.mapService.flyTo(this.placesService.userLocation!);

  }

}
