import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.models';

@Injectable({
    providedIn: 'root',
})
export class UsersService {

    private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

    constructor (private readonly http: HttpClient) {}

    getUsers (): Observable<User[]> {

        return this.http.get<User[]>(this.apiUrl);

    }

    getUserById (id: number): Observable<User> {

        return this.http.get<User>(`${this.apiUrl}/${id}`);

    }

}
