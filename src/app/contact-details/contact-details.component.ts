import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { Contact, ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ContactDetailsComponent {
  contact: Contact;
  action: string;

  constructor(
    private contactsService: ContactsService,
    @Inject(MAT_DIALOG_DATA) public data: any
 ) { }

  ngOnInit() {
    console.log(this.data)
    this.action = this.data.action;
    this.contact = { ...this.data.contact}  || {};
  }

  save() {
    if (this.action === 'EDIT') {
      this.contactsService.editContact(this.contact)
    }

    if (this.action === 'NEW_CONTACT') {
      this.contactsService.addContact(this.contact)
    }
  }
}
