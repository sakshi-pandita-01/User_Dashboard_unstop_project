import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  user = { name: '', email: '', role: '' };

  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  @Output() onClose = new EventEmitter<any>();
  @Output() addNewUser = new EventEmitter<any>();

  closeForm() {
    this.onClose.emit();
  }

  addUser() {
    // adding validation

    if (this.myForm.invalid) {
      alert('Invalid user details');
      return;
    }

    this.addNewUser.emit(this.myForm.value);

    this.closeForm();
  }
}
