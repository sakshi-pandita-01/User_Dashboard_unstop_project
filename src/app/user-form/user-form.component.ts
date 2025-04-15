import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  user = { name: '', email: '', role: '' };

  @Output() onClose = new EventEmitter<any>();
  @Output() addNewUser = new EventEmitter<any>();

  closeForm() {
    this.onClose.emit();
  }

  addUser() {
    this.addNewUser.emit(this.user);
  }
}
