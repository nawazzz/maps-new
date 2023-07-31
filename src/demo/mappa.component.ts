import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './mappa.component.html',
  styleUrls: ['./demo.component.scss']
})
export class MappaComponent implements OnInit{

    mapOptions: google.maps.MapOptions;
    handleZoom: boolean = false;
    zoom: any = 8;
    
    ngOnInit(): void {
        // this.handleZoom = !this.handleZoom;
        // this.mapOptions.zoomControl = true;
        // this.mapIsZoomed(this.mapOptions)
        this.mapIsZoomed

    }   
    
    mapIsClicked() {
        console.log('do something')
    }

    mouseMoved() {
        
    }

    mapDragged(event: any) {

    }

    centerMoved() {

    }

    mapIsIdle() {

    }

    editZoom() {

    }

    zoomIntoMap() {
        console.log('eeee')
    }

    mapIsZoomed(event: any) {
        console.log(event, this.handleZoom)
        this.handleZoom = !this.handleZoom;

    }

    zoomIn() {
        this.zoom++;
    }

    zoomOut() {
        this.zoom--;
    }

    mapIsDragged(event: any) {
        console.log(event)
    } 

    mapMarker(event: any) {
        console.log(event)
    }
}

// (mapClick)="clickMap($event)"
// (mapMousemove)="move($event)"
// (mapDragend)="move($event)"
// (centerChanged)="moveCenter($event)"
// (idle)="mapIsReady($event)"
// (zoomChange)="changeZoom($event)"