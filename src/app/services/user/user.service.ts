import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: any[];
  constructor(private http: HttpClient) { }

  createUser(userData) {
    return this.http.post('/routes/users', userData);
  }

  updateUser(id, userData) {
    return this.http.put('/routes/users/' + id, userData);
  }

  deleteUser(id) {
    return this.http.delete('/routes/users/' + id);
  }

  getUsers() {
    return this.http.get('/routes/users');
  }

  setUsers(users) {
    console.log('users', users);
    this.users = users;
  }

  getUser(id) {
    return this.http.get('/routes/users/' + id);
  }

  getUserByName(name) {
    return this.http.get('/routes/users/name/' + name);
  }
}
