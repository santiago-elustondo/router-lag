import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { MdIconRegistry } from '@angular2-material/icon';
import { appRouterProviders } from './app.routes';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [
  
  //icons stuff
  HTTP_PROVIDERS,
  MdIconRegistry,

  //router stuff
  appRouterProviders
  
]);