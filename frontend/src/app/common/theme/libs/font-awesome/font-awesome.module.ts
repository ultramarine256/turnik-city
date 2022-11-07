import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faInstagram, faTelegram, faTrello } from '@fortawesome/free-brands-svg-icons';
import {
  faCircleUser,
  faComment,
  faEye,
  faFaceSmile,
  faFolder,
  faHeart,
  faMap,
  faNewspaper,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import {
  faEarthEurope,
  faLocationCrosshairs,
  faLocationDot,
  faMapLocationDot,
  faPeopleGroup,
  faPlus,
  faSkull,
  faStreetView,
  faTreeCity,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class AppFontAwesomeModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      ...[
        faInstagram,
        faTelegram,
        faGithub,
        faNewspaper,
        faFolder,
        faHeart,
        faPlus,
        faTrello,
        faLocationDot,
        faPeopleGroup,
        faEarthEurope,
        faTreeCity,
        faMapLocationDot,
        faUser,
        faSkull,
        faCircleUser,
        faStreetView,
        faFaceSmile,
        faLocationCrosshairs,
        faMap,
        faEye,
        faComment,
        faXmark,
      ]
    );
  }
}
