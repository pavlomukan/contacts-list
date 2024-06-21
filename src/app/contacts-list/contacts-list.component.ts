import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Contact, ContactsService } from '../contacts.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule, MatDividerModule, MatIconModule, MatDialogModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.css'
})
export class ContactsListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'lastName', 'phoneNumber', 'buttons'];
  dataSource;

  readonly editDialog = inject(MatDialog);
  readonly newContactDialog = inject(MatDialog);
  readonly deleteDialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private contactsService: ContactsService){
    const contacts = this.contactsService.getContacts();
    this.dataSource = new MatTableDataSource<Contact>(contacts);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openEditDialog(contact: Contact) {
    const dialogRef = this.editDialog.open(ContactDetailsComponent, {
      data: {
        action: 'EDIT',
        contact
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const contacts = this.contactsService.getContacts();
        this.dataSource = new MatTableDataSource<Contact>(contacts);
      }
    });
  }

  openDeleteDialog(contact: Contact) {
    const dialogDeleteRef = this.deleteDialog.open(DeleteConfirmationModalComponent);

    dialogDeleteRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactsService.deleteContact(contact.id);
        const contacts = this.contactsService.getContacts();
        this.dataSource = new MatTableDataSource<Contact>(contacts);
      }
    });
  }

  openNewContactDialog() {
    const dialogRef = this.newContactDialog.open(ContactDetailsComponent, {
      data: { action: 'NEW_CONTACT' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const contacts = this.contactsService.getContacts();
        this.dataSource = new MatTableDataSource<Contact>(contacts);
      }
    });
  }

}



