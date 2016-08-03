import { Component } from '@angular/core';

//material
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

@Component({
  selector: 'blsp-material-test',
  template: `
    <div>
    <button md-button>Button</button>
    <button md-raised-button>Button</button>
    <button md-fab>
       <md-icon class="md-24">add</md-icon>
    </button>
    <button md-mini-fab>
       <md-icon class="md-24">add</md-icon>
    </button>
    </div>
  `,
  directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_ICON_DIRECTIVES]
})
export class MaterialTestComponent {}