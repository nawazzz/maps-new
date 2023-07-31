import { Component, ElementRef, Input, NgZone, OnInit, inject } from '@angular/core';
import { MapEventManager } from '@angular/google-maps';
import { BehaviorSubject, Observable, combineLatest} from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'map-info-window',
  templateUrl: './map-info-window.component.html',
  styleUrls: ['./map-info-window.component.scss']
})
export class MapInfoWindowComponent implements OnInit {

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12}
  private _eventManager = new MapEventManager(inject(NgZone));
  private readonly _options = new BehaviorSubject<google.maps.InfoWindowOptions>({});
  private _position = new BehaviorSubject<google.maps.LatLngLiteral | google.maps.LatLng | undefined>(undefined);

  @Input()
  set position(position: google.maps.LatLngLiteral | google.maps.LatLng) {
    this._position.next(position);
    console.log(this._position)
  }

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
  ) { }
  
  ngOnInit() {
    this._combineOptions()
    // if (this._googleMap._isBrowser) {
    //   const combinedOptionsChanges = this._combineOptions();

    //   combinedOptionsChanges.pipe(take(1)).subscribe(options => {
    //     // Create the object outside the zone so its events don't trigger change detection.
    //     // We'll bring it back in inside the `MapEventManager` only for the events that the
    //     // user has subscribed to.
    //     this._ngZone.runOutsideAngular(() => {
    //       this.infoWindow = new google.maps.InfoWindow(options);
    //     });

    //     this._eventManager.setTarget(this.infoWindow);
    //   });

    //   this._watchForOptionsChanges();
    //   this._watchForPositionChanges();
    // }
  }

  public _combineOptions(): Observable<google.maps.InfoWindowOptions> {
    return combineLatest([this._options, this._position]).pipe(
      map(([options, position]) => {
        const combinedOptions: google.maps.InfoWindowOptions = {
          ...options,
          position: position || options.position,
          content: this._elementRef.nativeElement,
        };
        console.log(combinedOptions, this._position)
        return combinedOptions;
      }),
    );
  }

  // private _watchForPositionChanges() {
  //   this._position.pipe(takeUntil(this._destroy)).subscribe(position => {
  //     if (position) {
  //       this._assertInitialized();
  //       this.infoWindow.setPosition(position);
  //     }
  //   });
  // }

}
