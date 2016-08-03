import { RouterConfig, provideRouter } from '@angular/router';
import { DogsComponent } from './dogs/dogs.component';
import { CatsComponent } from './cats/cats.component';
import { AuthGuardService, LoginPageComponent } from './auth/index';
import { FrameComponent } from './layout/index';
import { LoadingComponent } from './layout/index';

const routes: RouterConfig = [
  {
    path: 'loading',
    component: LoadingComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  { 
    path: '', 
    component: FrameComponent,
    canActivate: [AuthGuardService],
    children:[
      { 
        path: 'dogs', 
        component: DogsComponent
      },
      { 
        path: 'cats', 
        component: CatsComponent 
      },
      { 
        path: '', 
        redirectTo: '/dogs' //HOME_PAGE (put in config module)
      },
    ]
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];