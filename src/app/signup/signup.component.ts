import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService, User } from '../user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  public signupForm!: FormGroup;
  user !: User ;
  
  isLoading :boolean = false;
  isWorking = false;
  submitted = false;
  elementRef: any;
  //photo !: HTMLImageElement | null;
  photo: any;
constructor(private fb: FormBuilder, 
 private userService : UserService,
   private router : Router) { }




ngOnInit(): void {
    this.photo = document.getElementById('photo');
   let imgData = getBase64Image(this.photo);
   localStorage.setItem("imgData", imgData); 
  this.createForm();
  this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.isWorking = true;
    this.signupForm.disable();
}
 createForm(){
  this.isLoading = false;
  this.signupForm = this.fb.group({
    name : new FormControl('', [Validators.required]),
    surname :new FormControl('', [Validators.required]),
    username :new FormControl('', [Validators.required]),
    email :new FormControl('', [Validators.required, Validators.email]),
    // password:new FormControl('', [Validators.required, Validators.pattern('/((?=.\d)(?=.[A-Z]).{8,})/gm')]), 
    password:new FormControl('', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[A-Z]).{8,})')]),
   image:new FormControl('', []),

  })
 }

signUp(){
  this.isLoading = true;
  this.user = this.signupForm.value;
  this.userService.signUp(this.user).subscribe((res: User)=>{
  alert("Sign up Successfull");
  this.signupForm.reset();
  
  console.log(res.id)
  this.router.navigate(['home']);

  
})
}
}

function getBase64Image(img: HTMLImageElement) {
  let canvas: HTMLCanvasElement = document.createElement("canvas");
  let ctx: CanvasRenderingContext2D | null;
  if (!(ctx = canvas.getContext("2d"))) {
      throw new Error(`2d context not supported or canvas already initialized`);
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

let dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}