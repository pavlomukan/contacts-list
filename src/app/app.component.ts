import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { HeaderComponent } from './header/header.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactsListComponent, HeaderComponent, ContactDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contact_list';
}
