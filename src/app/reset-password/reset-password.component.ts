import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from '../reset-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  editPassword! : FormGroup

  constructor(
    private fb: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.editPassword = this.fb.group({
      email   : ['', [Validators.required, Validators.email]],
      currPW  : ['', Validators.required],
      newPW   : ['', [Validators.required, Validators.minLength(6)]],
      reNewPW : ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: this.resetPasswordService.passwordMatchValidator('newPW', 'reNewPW')
    })
  }

  resetPW() {
    if (this.editPassword.valid) {
      let itemModel = this.editPassword.value
      console.log(itemModel)      
      this.resetPasswordService.savePassword(itemModel)
      .subscribe({
        next: (response: any) => {
          console.log(response)
        }
      })
      this.router.navigate(['home']);
  }
}

}
