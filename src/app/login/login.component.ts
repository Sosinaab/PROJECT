  import { Component, OnInit } from '@angular/core';
  import { Router, ActivatedRoute } from '@angular/router';
  import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
  import { UserService, User } from '../user/user.service';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs';
  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  public loginForm!: FormGroup;
  isWorking = false;
  submitted = false;
  user !: User;

constructor(private fb: FormBuilder, 
  
   private router : Router, 
   private userService : UserService,
   private authenticationService : AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
  }
    }


ngOnInit(): void {
  this.createForm();
  this.submitted = true;

  if (this.loginForm.invalid) {
    return;
  }

  this.isWorking = true;
  this.loginForm.disable();
}
 createForm(){
  this.loginForm = this.fb.group({
    username:new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required]), 
   })
 }
Login(){
  this.user = this.loginForm.value; 
  this.authenticationService.login(this.user.username , this.user.password)
  .subscribe(
      data => {
        alert("Login in Successfull");
          this.router.navigate(['home']);
      },
      error => {
          // this.alertService.error(error);
          // this.loading = false;
      });
}


}