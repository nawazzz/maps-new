import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit{
  title = 'app';

  alternate: boolean = false;
  toggle: boolean = false;
  color: boolean = false;
  dotAnimation: boolean = true;
  contentAnimation: boolean = true;
  size: number = 40;
  side: string = 'left';
  mobileWidthThreshold: number = 640;

  entries = [
    {
      header: 'header',
      content: 'content'
    }
  ]

  constructor( 
    private router:Router){
      
  }

  ngOnInit(){
    //this.gotoMap();
  }

  gotoMap(){
    this.router.navigate(['maps']);
  }

  gotoAutocomplete(){
    this.router.navigate(['autocomplete'])
  }

  gotoMapMarker(){
    this.router.navigate(['map-marker'])
  }

  addEntry() {
    this.entries.push({
      header: 'header',
      content: 'content'
    })
  }

  removeEntry() {
    this.entries.pop();
  }

  onExpand(event: boolean, index: number) {
    console.log(event, index);
  }

  toggleSide() {
    this.side = this.side === 'left' ? 'right' : 'left';
  }

  gotoMapInfoWindow(){
    this.router.navigate(['map-info']);
  }
}
