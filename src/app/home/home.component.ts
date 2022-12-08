import { Component } from '@angular/core';
import { first } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { User, UserService } from '../user/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUser!: User;
  users :any;

  constructor(
    private authenticationService: AuthenticationService,
      private userService: UserService
  ) {
 
      this.currentUser = this.authenticationService.currentUserValue;

  }

  ngOnInit() {
      this.loadAllUsers();
  }
  private loadAllUsers() {
    this.userService.getAll()
        .pipe(first())
        .subscribe((users: any) => this.users = users);
}
}