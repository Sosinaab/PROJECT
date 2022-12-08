import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { UserService, User } from './user/user.service';
@Injectable({
  providedIn: 'root',

})

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private httpClient: HttpClient) {
        const currentUser: string = localStorage.getItem('currentUser') as string; 
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(currentUser));
            this.currentUser = this.currentUserSubject.asObservable();
    }
     parseJwt (token : any) {
        var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;

    }
    login(username : string, password : string) {
        return this.httpClient.post<any>("https://fakestoreapi.com/auth/login", { username : username, password : password})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user)); 
                this.currentUserSubject.next(user);
                return user;
            }))
            
         
    }
    
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null!);
    }
      
}