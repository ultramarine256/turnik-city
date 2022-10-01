import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ui-page',
  styleUrls: ['./ui-page.component.scss'],
  templateUrl: './ui-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class UIPageComponent {
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
}
