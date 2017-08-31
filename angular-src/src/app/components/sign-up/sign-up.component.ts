import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    var user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    // Required Fields
    if (!this.validateService.validateSignup(user)) {
      this.flashMessage.show('Please fill in all details', { cssClass: 'card-panel, pink accent-3', timeout: 3000 });
    }
    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please enter the valid email');
    }
    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are now registered and can login', { cssClass: 'card-panel, pink accent-3', timeout: 3000 });
        this.router.navigate(['/login']);
      }
      else {
        this.flashMessage.show('Something went wrong.');
        this.router.navigate(['/register']);
      }
    })
  }
}
