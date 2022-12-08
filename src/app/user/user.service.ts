import { Injectable } from '@angular/core';

import { HttpClient , HttpParams} from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
export interface User{
  token: any;
  id: number ; 
  address : Address;
  email : string;
  username : string;
  password : string ;
  name : Name;
  phone : string;
  __v : number;
  image ?: string,
}

export type Name = {
  firstname : string;
  lastname : string;
  
  }
  export type Address = {
    geolocation : Geolocation;
    city : string;
    street : string;
    number : number;
    zipcode : string;
    }
    export type Geolocation = {
      lat : string;
      long : string;
      
      }
@Injectable({
  providedIn: 'root'
})
export class UserService {
  nameString : any;
  constructor(private httpClient: HttpClient) { 
     }

     signUp(user : User): Observable<any>{
      return  this.httpClient.post("https://fakestoreapi.com/users", user);
      }
  getAll() {
    return this.httpClient.get<User[]>("https://fakestoreapi.com/users");
}
getUserDetail(id:number):Observable<any>{
 return  this.httpClient.get(`https://fakestoreapi.com/users/${id}`)
}
updateData(user : User, id : number): Observable<any> {

  const body = {
    email : user.email,
    username : user.username,
    password : user.password,
   name: user.name ,
     address : user.address,
    
   
   
    
    phone : user.phone
  }

 return this.httpClient.put<User>(`https://fakestoreapi.com/users/${id}`,body)
}
  
}

