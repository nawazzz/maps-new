import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyMapsAPILoader } from '../sirti-agm.service';
// import { MapsAPILoader } from '@agm/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
// import { GooglePlaceModule } from 'ngx-google-places-autocomplete'; 


@Component({
  selector: 'sirti-agm-autocomplete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {



  location: any;
  center: any;
  getWidth: any;
  zoom: any;
  getHeight: any;
  isApiLoaded = false;
  options: any = {
    componentRestrictions: { country: 'IT' }
  }

  @Output() onAddressChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  constructor(
    private lazyMapsAPILoader: LazyMapsAPILoader
  ) { }

  ngOnInit() {
    this.lazyMapsAPILoader.load().then(() => {
      this.isApiLoaded = true
    })
    this.zoom = 8;
  }

  public handleAddressChange(event: any) {
  
    this.center = {
                    lat: Number(event.geometry.location.lat()), 
                    lng: Number(event.geometry.location.lng())
                  }
  }

}

export interface PositionMarker {
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
}

export interface GoogMapOptions {
  zoom?: number;
  center: PositionMarker;
  fillColor?: string;
  draggable?: boolean;
  editable?: boolean;
  visible?: boolean;
  originMarker?: any;
  markers?: any;
  address?: any;
  latitude: number;
  longitude: number;
  mapTypeId?: any;
  mapTypeControl?: boolean;
  mapTypeControlOptions?: any;
  scaleControl?: boolean;
  scaleControlOptions?: any;
  usePanning?: any;
}
