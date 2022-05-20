import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }

  get email() {
    return this.contactForm.get('email');
  }

  onSubmit() {
    console.log(this.contactForm.value);
    const payload = {
      email: this.contactForm.value.email,
      password: this.contactForm.value.password
    }

    this.authService.login(payload).pipe(take(1)).subscribe(data => {
      console.log(data);
      if(data.result_code == 0){
        this.router.navigate(['']);
      }
    })
  }

}
