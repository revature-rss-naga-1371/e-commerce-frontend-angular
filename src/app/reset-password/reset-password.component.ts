import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResetPasswordService } from '../reset-password.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.editPassword = this.fb.group({
      email   : [],
      currPW  : [],
      newPW   : [],
      reNewPW : []
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
