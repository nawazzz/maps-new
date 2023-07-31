import { NgModule } from "@angular/core";
// import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from "./demo.component";
import { MappaComponent } from "./mappa.component";  
import { AutoCompleteComponent } from "../sirti-agm/auto-complete/auto-complete.component"; 
import { MapInfoWindowComponent } from "../sirti-agm/map-info-window/map-info-window.component";
import { MapMarkerComponent } from "../sirti-agm/map-marker/map-marker.component";

const routes: Routes = [
    { path: 'home', component: DemoComponent },
    { path: 'maps', component: MappaComponent },
    { path: 'autocomplete', component: AutoCompleteComponent },
    { path: 'map-info', component: MapInfoWindowComponent },
    { path: 'map-marker', component: MapMarkerComponent },
    { path: '' , redirectTo: '/maps', pathMatch: "full"}
]

@NgModule({
    imports: [
        // CommonModule
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class DemoRoutingModule { }