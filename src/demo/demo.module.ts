import { MglTimelineModule } from '../timeline/timeline.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';
// import { GoogleMapsModule } from '@angular/google-maps';
// import { MapsComponent } from '../sirti-agm/maps/maps.component';
// import { AutoCompleteComponent } from '../sirti-agm/auto-complete/auto-complete.component';
import { SirtiAgmModule } from '../sirti-agm/sirti-agm.module'; 
import { environment } from '../environments/environment';
import { LazyMapsAPILoader,DocumentRef,WindowRef } from '../sirti-agm/sirti-agm.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { MappaComponent } from './mappa.component';
const config = {
  signature: environment.apiKeyGoogleApi,
  libraries: ['places', 'drawing', 'geometry'],
  clientId:environment.clientGoogleApi,
  channel:environment.channelGoogleApi,
  language: 'it',
  region: 'IT' // identifica e restringe la ricerca alla sola nazione
}

@NgModule({
  declarations: [
    DemoComponent,
    MappaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MglTimelineModule,
    CommonModule,
    GoogleMapsModule,
    DemoRoutingModule,
    SirtiAgmModule.forRoot(config)
  ],
  providers: [LazyMapsAPILoader,DocumentRef,WindowRef],
  bootstrap: [DemoComponent]
})
export class AppModule { 



}
