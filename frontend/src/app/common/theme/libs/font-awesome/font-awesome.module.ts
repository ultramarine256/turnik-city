import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faFolder, faNewspaper } from '@fortawesome/free-regular-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class AppFontAwesomeModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(...[faInstagram, faTelegram, faGithub, faNewspaper, faFolder]);
  }
}
