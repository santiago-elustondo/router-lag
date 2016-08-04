import { RouterConfig, provideRouter } from '@angular/router';
import { DogsComponent } from './dogs/dogs.component';
import { CatsComponent } from './cats/cats.component';

const routes: RouterConfig = [
  { 
    path: 'dogs', 
    component: DogsComponent
  },
  { 
    path: 'cats', 
    component: CatsComponent 
  },
];

export const appRouterProviders = [
  provideRouter(routes)
];