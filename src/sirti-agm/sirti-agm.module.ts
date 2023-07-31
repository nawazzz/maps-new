import { MapsComponent } from "./maps/maps.component";
import { AutoCompleteComponent } from "./auto-complete/auto-complete.component";
import { MapInfoWindowComponent } from "./map-info-window/map-info-window.component"
import { ModuleWithProviders, NgModule } from "@angular/core";
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SirtiAgmModuleConfig } from "./models/sirti-agm.config";
import { SirtiAgmModuleConfigService } from "./sirti-agm.service";
import { CommonModule } from '@angular/common';
import { MapMarkerComponent } from './map-marker/map-marker.component';
import { LazyMapsAPILoader } from './sirti-agm.service';
import { BehaviorSubject, Observable, Observer } from "rxjs";


@NgModule({
    declarations: [
        MapsComponent,
        AutoCompleteComponent,
        MapInfoWindowComponent,
        MapMarkerComponent
    ],
    imports:[
        GoogleMapsModule,
        GooglePlaceModule,
        CommonModule
       ],
    exports: [
        MapsComponent,
        AutoCompleteComponent,
        GoogleMapsModule,
        MapInfoWindowComponent
    ],
})

export class SirtiAgmModule {

    loadMap:boolean = false;
    error:boolean;

    constructor(private lazyMapsAPILoader: LazyMapsAPILoader) {
        this.createLink();
    }

    createLink(){
        this.lazyMapsAPILoader.load()
        .then((res) => {
          this.loadMap =true;
          this.lazyMapsAPILoader.setInitLink(true);
        })
        .catch((err) => {
          this.loadMap =false;
          this.error = true;
          this.lazyMapsAPILoader.setInitLink(false);
        })
    }

    static forRoot(config: SirtiAgmModuleConfig):  ModuleWithProviders<SirtiAgmModule> {
        // console.log(config);
        return {
            ngModule: SirtiAgmModule,
            providers: [
            {
                provide: SirtiAgmModuleConfigService,
                useValue: config
            }
            ]
        }
    }
}

