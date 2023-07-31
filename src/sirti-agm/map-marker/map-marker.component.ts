import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sirti-agm-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.scss']
})
export class MapMarkerComponent {

  // @Input() markers: google.maps.MapOptions;
  @Input() markers: any[] = [];
  @Output() mapClick: EventEmitter<any> = new EventEmitter<any>();

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12}
  zoom: any = 4;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[];

  addMarker(event: any) {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lat + ((Math.random() - 0.5) * 2) / 10, 
      },
      label: {
        color: 'red',
        text: 'Marker label' + (this.markers.length + 1),
      },
      title: 'Marker title' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    })
    this.mapClick.emit(this.markers)
  }
}
