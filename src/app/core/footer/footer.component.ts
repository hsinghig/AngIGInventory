import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public displayMessage = 'Copyright 2011-' +(new Date()).getFullYear() + '. Impact Guard, LLC.';
}
