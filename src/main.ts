import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jpc3RpYW5ob3J0dWEiLCJhIjoiY2x2ZzY0cXlvMHJrcDJscWM5dG50Nnl2ZCJ9.WODGV3cOpIb8DJF1mTny-A';

if(!navigator.geolocation){

  alert('Navegador no soporta la Geolocalizacion')
  throw new Error('Navegador no soporta la Geolocalizacion')

}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
