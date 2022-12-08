import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User, UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('myname') input: any; 
  currentUser !: User;
  currentUserId: any;
  public userDetails!: Observable<User>;
  isLoading: boolean | undefined;
  user !: User ;
  elementRef: any;
  initials !: string;
bannerImg: any;
 
constructor(private router: Router, 
  private authenticationService: AuthenticationService,
  private userService : UserService){
  this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  if(this.currentUser){
    this.currentUserId = this.authenticationService.parseJwt(this.currentUser.token).sub;
}
}
ngOnInit(){
 

   this.userDetails = this.userService.getUserDetail(this.currentUserId);
  this.userDetails.subscribe({
    next: (data: any) => {
      this.isLoading = false;
      this.user = data;
       this.getInitials(this.user)
    },
    error: (error: any) => {
    
    },
  }); 


  let dataImage = localStorage.getItem('imgData');
  this.bannerImg = document.getElementById('photo') as HTMLImageElement;
  this.bannerImg = "data:image/png;base64," + dataImage;
}

getInitials(user : User){
 this.initials = (user.name.firstname.match(/\w{1,1}/) + '' + user.name.lastname.match(/\w{1,1}/)).toUpperCase(); 
    }


logout() {
  this.authenticationService.logout();
  this.router.navigate(['']);
}
updateUser() {
  if(this.currentUser){
      this.currentUserId = this.authenticationService.parseJwt(this.currentUser.token).sub;
  }
  this.router.navigate(['user', this.currentUserId]);
}
}
