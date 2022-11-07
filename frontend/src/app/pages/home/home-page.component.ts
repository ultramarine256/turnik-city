import { Component, OnInit } from '@angular/core';
import { AppStore } from '@turnik/domain';

import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  images = [
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-soa.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-qzf.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-z0t.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-6lx.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-qqx.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-olg.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-c4w.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-6f-.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-s1n.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-yjp.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-twy.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-mhc.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-3mm.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-yej.jpg',
    'https://turnikcity.blob.core.windows.net/images/2019-06-11-10-06-06-zqs.jpg',
  ];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { enabled: true, clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(public store: AppStore) {}

  ngOnInit() {}
}
