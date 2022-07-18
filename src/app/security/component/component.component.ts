import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DASHBOARD_ROUTE } from 'src/app/constants/routes';
import { AuthenticationFacade } from '../facade/authentication.facade';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authenticationFacade: AuthenticationFacade
  ) {
    this.loginForm = this.fb.group({
      userName: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  login() {
    const { valid, touched, dirty } = this.loginForm;
    this.authenticationFacade.isAuthenticated$.subscribe(
      (isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.router.navigate([DASHBOARD_ROUTE]);
        }
      }
    );
    if (valid && (touched || dirty)) {
      const loginRequest: { userName: string; password: string } =
        this.loginForm.value;
      this.authenticationFacade.login(loginRequest);
    }
  }

}
