import { Component, OnInit } from '@angular/core';
import { AppStore, PlaygroundFacade, PlaygroundMarkerModel } from 'app/domain';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-playground-details-page',
  templateUrl: './playground-details.page.html',
  styleUrls: ['./playground-details.page.scss'],
})
export class PlaygroundDetailsPage implements OnInit {
  readonly center$ = new ReplaySubject<{ lng: number; lat: number }>();
  readonly markers$ = new ReplaySubject<PlaygroundMarkerModel[]>();

  constructor(public facade: PlaygroundFacade, public store: AppStore, private route: ActivatedRoute) {}

  ngOnInit() {
    // TODO: uncomment
    // const slug = this.route.snapshot.paramMap.get('slug') || '';
    const slug = '4943-srednjaja-homuty';
    this.facade.getBySlug(slug).subscribe(r => {
      this.center$.next({ lng: r.lng, lat: r.lat });
      const marker = new PlaygroundMarkerModel({ id: r.id, slug: r.slug, lat: r.lat, lng: r.lng });
      this.markers$.next([marker]);
    });
  }
}
