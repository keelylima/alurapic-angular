import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const fn = this.userNotTakenValidatorService.checkUserNameTaken();
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      userName: [
        '',
        //segundo parametro são validadores sincronos
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
        //terceiro parametro é validador assincrono
        this.userNotTakenValidatorService.checkUserNameTaken(),
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
        ],
      ],
    });
  }

  signUp() {
    // me passa um objeto com os valores de cada campo de formulário que criei
    const newUser = this.signUpForm.getRawValue() as NewUser;
    this.signUpService.signUp(newUser).subscribe(() => {
      this.router.navigate(['']);
    }),
      (err) => {
        console.log(err);
      };
  }
}
