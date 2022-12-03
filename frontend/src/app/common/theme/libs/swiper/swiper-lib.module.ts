import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper';

// swiper modules
SwiperCore.use([Navigation, Pagination]);

@NgModule({
  imports: [SwiperModule],
  exports: [SwiperModule],
})
export class SwiperLibModule {}

const swiperOptions: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: true,
  pagination: { enabled: true, clickable: true },
  scrollbar: { draggable: true },
};

export { swiperOptions };
