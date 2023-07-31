import { Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, AfterContentInit } from '@angular/core';
import { LazyMapsAPILoader } from '../sirti-agm.service';
@Component({
  selector: 'sirti-agm-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterContentInit {

  @Input() height = 500;
  @Input() width = 700;
  @Input() longitude = 0;
  @Input() latitude = 0;
  @Input() zoom: any;
  @Input() options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  @Input() showZoom: any = this.options.zoomControl;

  @Output() mapClick: EventEmitter<google.maps.MapMouseEvent | google.maps.IconMouseEvent> = new EventEmitter<google.maps.MapMouseEvent | google.maps.IconMouseEvent>();
  @Output() centerChange: EventEmitter<google.maps.LatLngLiteral> = new EventEmitter<google.maps.LatLngLiteral>();
  @Output() zoomChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() mapReady: EventEmitter<any> = new EventEmitter<any>();
  @Output() mapMousemove: EventEmitter<any> = new EventEmitter<any>();
  @Output() mapDragend: EventEmitter<any> = new EventEmitter<any>();
  @Output() idle: EventEmitter<any> = new EventEmitter<any>();
  @Output() zoomInMap: EventEmitter<any> = new EventEmitter<any>();
  @Output() zoomOutMap: EventEmitter<any> = new EventEmitter<any>();
  @Output() zoomMap: EventEmitter<any> = new EventEmitter<any>();
  @Output() mapDrag: EventEmitter<any> = new EventEmitter<any>();




  //@ContentChildren(AgmMapControl) mapControls: QueryList<AgmMapControl>;
  get getHeight() { return this.height };
  get getWidth() { return this.width };
  get getLongitude() { return this.longitude };
  get getLatitude() { return this.latitude };
  get getZoom() { return this.zoom }
  set setZoom(val:number | null | undefined) { this.zoom = val;}
  get isLinkLoaded(){return this.lazyMapsAPILoader.getInitLink()}

  constructor(
    private lazyMapsAPILoader: LazyMapsAPILoader,
    private _elem: ElementRef
    ) {}

  options1: google.maps.MapOptions = {};
  display: any;
  minZoom:number;
  maxZoom:number;
  center: google.maps.LatLngLiteral = { lat: this.getLatitude, lng: this.getLongitude };
  
  
  // zoom= this.getZoom;

  // this.SirtiAgmModuleConfigService.WindowRef.getNativeWindow
  ngOnInit(){

    console.log(this.showZoom)
    this.minZoom = Number(this.options?.minZoom);
    this.maxZoom = Number(this.options?.maxZoom);
    return; 
  }

  ngAfterContentInit() {

    this.center = { lat: this.getLatitude, lng: this.getLongitude };
  }

  spostaCentro() {
    this.center = { lat: 50, lng: 30 };
  }

  clickMap(event: any) {
    // this.mapClick.emit(event)
    console.log(event)
    if (event.latLng != null)
      this.center = (event.latLng.toJSON())
      this.mapClick.emit(event);
      console.log(this.mapClick)
  }

  move(event: any) {
    this.mapDragend.emit()
    // console.log(event)
    //if (event.latLng != null)

    //this.display = event.latLng.toJSON();
    //console.log(this.display)
  }

  moveCenter(event: any) {
    console.log(event)
    if (this.centerChange.observed)
      return this.centerChange.emit(event);

  }

  changeZoom(event: any) {
    console.log(event)
    if (this.zoomChange.observed)
      return this.zoomChange.emit(event);
  }

  mapIsReady(event: any) {
    console.log(event)
    if (this.mapReady.observed)
      this.mapReady.emit(event);
  }

  zoomIn() {
    console.log('zoomIn', this.zoom, this.maxZoom)
    // if (this.zoom < this.maxZoom)
    this.zoom++;
    console.log('zoomIn2')



  }

  zoomOut() {
    console.log('zoomOut', this.zoom, this.minZoom)
    // if (this.zoom > this.minZoom)
    this.zoom--;



  }

  manageZoom() {
    this.showZoom = !this.showZoom;
    this.zoomMap.emit(this.options);
    console.log(this.options)
  }

  mapDragged() {
    this.mapDrag.emit(this.options)
  }

}
