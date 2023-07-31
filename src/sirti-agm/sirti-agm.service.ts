import { Inject, Injectable, InjectionToken, LOCALE_ID, Optional, Provider, NgZone } from '@angular/core';
import { SirtiAgmModuleConfig } from './models/sirti-agm.config';
import { SirtiAgmModule } from './sirti-agm.module';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
export const SirtiAgmModuleConfigService = new InjectionToken<SirtiAgmModuleConfig>("SirtAgmModuleConfig");

export class WindowRef {
    getNativeWindow(): any { return window; }
}
  
export class DocumentRef {
    getNativeDocument(): any { return document; }
}
  
export const BROWSER_GLOBALS_PROVIDERS: Provider[] = [WindowRef, DocumentRef];

@Injectable()
export abstract class MapsAPILoader {
  abstract load(): Promise<void>;
}

export enum GoogleMapsScriptProtocol {
    HTTP = 1,
    HTTPS = 2,
    AUTO = 3,
  }

@Injectable()
export class LazyMapsAPILoader extends MapsAPILoader {


  protected _scriptLoadingPromise: Promise<void>;
  protected _config: SirtiAgmModuleConfig;
  protected _windowRef: WindowRef;
  protected _documentRef: DocumentRef;
  protected readonly _SCRIPT_ID: string = 'agmGoogleMapsApiScript';
  protected readonly callbackName: string = `agmLazyMapsAPILoader`;
  private initLink: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public obsInitLink: Observable<boolean> = this.initLink.asObservable(); 

  constructor(@Optional() @Inject(SirtiAgmModuleConfigService) config: any = null, w: WindowRef, d: DocumentRef,
              @Inject(LOCALE_ID) private localeId: string, private _zone: NgZone) {
    super();
    this._config = config || {};
    this._windowRef = w;
    this._documentRef = d;
  }

  setInitLink(flag: boolean) {
    this.initLink.next(flag);
  }

  getInitLink() {
    let pippo = false;
    this.obsInitLink.subscribe( (val) => pippo = val );
    return pippo;
  }
 

  load(): Promise<void> {
    const window = this._windowRef.getNativeWindow() as any;
    if (window.google && window.google.maps) {
      // Google maps already loaded on the page.
      return Promise.resolve();
    }

    if (this._scriptLoadingPromise) {
      return this._scriptLoadingPromise;
    }

    // this can happen in HMR situations or Stackblitz.io editors.
    const scriptOnPage = this._documentRef.getNativeDocument().getElementById(this._SCRIPT_ID);
    if (scriptOnPage) {
      this._assignScriptLoadingPromise(scriptOnPage);
      return this._scriptLoadingPromise;
    }

    const script = this._documentRef.getNativeDocument().createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.id = this._SCRIPT_ID;
    script.src = this._getScriptSrc(this.callbackName);
    this._assignScriptLoadingPromise(script);
    this._documentRef.getNativeDocument().body.appendChild(script);
    return this._scriptLoadingPromise;
  }

  handleMapZoomButton() {
    
  }

  // createLink(el: HTMLElement, mapOptions: google.maps.MapOptions) {
  //   return this._zone.runOutsideAngular(() => {
  //       this.load().then()
  //   })
  // }

  private _assignScriptLoadingPromise(scriptElem: HTMLElement) {
    this._scriptLoadingPromise = new Promise((resolve, reject) => {
      this._windowRef.getNativeWindow()[this.callbackName] = () => {
        resolve();
      };
      scriptElem.onerror  = (error: any) => {
        reject(error);
      };
    });
  }

  protected _getScriptSrc(callbackName: string): string {
    const protocolType: any =
        (this._config && this._config.protocol) || GoogleMapsScriptProtocol.HTTPS;
    
    let protocol: string = '';

    switch (protocolType) {
      case GoogleMapsScriptProtocol.AUTO:
        protocol = '';
        break;
      case GoogleMapsScriptProtocol.HTTP:
        protocol = 'http:';
        break;
      case GoogleMapsScriptProtocol.HTTPS:
        protocol = 'https:';
        break;
    }

    const hostAndPath: string = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
    const queryParams: {[key: string]: string | string[]} = {
      v: this._config.apiVersion || 'quarterly',
      callback: callbackName,
      //key: this._config.apiKey || this._config.signature || '',
      client: this._config.clientId,
      channel: this._config.channel,
      libraries: this._config.libraries,
      region: this._config.region || 'US',
      language: this._config.language || (this.localeId !== 'en-US' ? this.localeId : null),
    };
    const params: string = Object.keys(queryParams)
                               .filter((k: string) => queryParams[k] != null)
                               .filter((k: string) => {
                                 // remove empty arrays
                                 return !Array.isArray(queryParams[k]) ||
                                     (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
                               })
                               .map((k: string) => {
                                 // join arrays as comma seperated strings
                                 const i = queryParams[k];
                                 if (Array.isArray(i)) {
                                   return {key: k, value: i.join(',')};
                                 }
                                 return {key: k, value: queryParams[k]};
                               })
                               .map((entry: {key: any, value: any}) => {
                                 return `${entry.key}=${entry.value}`;
                               })
                               .join('&');
    return `${protocol}//${hostAndPath}?${params}`;
  }
}