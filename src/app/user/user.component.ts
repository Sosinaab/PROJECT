import { Component, OnInit } from '@angular/core';

import { User, UserService } from './user.service';
import { first, map, mergeMap, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user !: User ;
  isLoading = true ;
 public userDetails!: Observable<User>;
 currentUser !: User;
 currentUserId: any;
 editForm !: FormGroup;
 submitted = false;
constructor( private route: ActivatedRoute,
 private authenticationService: AuthenticationService,
 private formBuilder: FormBuilder,
 private userService : UserService){
 this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

}
ngOnInit(): void {
  this.updateForm();
    this.currentUserId = this.authenticationService.parseJwt(this.currentUser.token).sub;


  this.userDetails =  this.userService.getUserDetail(this.currentUserId);
      this.userDetails.subscribe(
     (data: any) => {
        this.isLoading = false;
        this.user = data;
       
        
        this.showForm(this.user)
      });
 


}
updateForm(){
  this.isLoading = false;
   this.editForm = this.formBuilder.group({

     city : new FormControl('', [Validators.required]),
    geolocation : new FormControl('', [Validators.required]),
    lat : new FormControl('', [Validators.required]),
    long : new FormControl('', [Validators.required]),
    name : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required]),
    street : new FormControl('', [Validators.required]),
    number : new FormControl('', [Validators.required]),
    zipcode : new FormControl('', [Validators.required]), 
    email : new FormControl('', [Validators.required]),
    username : new FormControl('', [Validators.required,Validators.email]),
    firstname : new FormControl('', [Validators.required]),
    lastname :new FormControl('', [Validators.required]), 
      phone : new FormControl('', [Validators.required]),
    
     password:new FormControl('', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[A-Z]).{8,})')]),
  //  image:new FormControl('', []),
   }) 
  
 }
 showForm(data : any){

  this.editForm.setValue({
    
    city : (data.address.city || ''),
    lat : (data.address.geolocation.lat|| ''),
    long : (data.address.geolocation.long || ''), 
    geolocation : (data.address.geolocation || ''),
    name : data.name,
    address : (data.address || ''),
    street : (data.address.street || ''),
    number : (data.address.number || ''),
    zipcode : (data.address.zipcode || ''), 
    email : data.email,
    username : data.username,
    firstname : data.name.firstname,
    lastname :data.name.lastname,
    phone : data.phone,
    // password:new FormControl('', [Validators.required, Validators.pattern('/((?=.\d)(?=.[A-Z]).{8,})/gm')]), 
     password:data.password,
  //  image:data.image
  });

}
update(){
  this.user = this.editForm.value ;
  this.userService.updateData(this.user, this.currentUserId ).subscribe((res: User)=>{
    alert("User updated Successfull");
  })
}


}
  