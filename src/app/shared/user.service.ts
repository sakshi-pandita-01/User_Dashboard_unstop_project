import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private UserList = new BehaviorSubject<User[]>([]);
  data$ = this.UserList.asObservable();

  updateUsers(user: any) {
    const currentData = this.UserList.value;
    this.UserList.next([...currentData, user]);
  }

  getRoleNumber(role: any) {
    return this.UserList.value.filter((user: any) => user.role === role).length;
  }
}
