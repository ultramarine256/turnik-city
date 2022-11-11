export class DealerScopeJson {
  id: number;
  title: string;
  slug: string;

  mapFromJson(json: any) {
    this.id = json.id;
    this.title = json.title;
    this.slug = json.slug;
    return this;
  }
}
