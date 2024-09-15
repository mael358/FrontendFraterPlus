import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { SharingDataService } from '../../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  user: Usuario = new Usuario();


  constructor(private userService: UserService, private route: ActivatedRoute, 
    private sharingDataService: SharingDataService) { }

  ngOnInit(): void {
    // this.sharingDataService.selectUserEventEmmiter.subscribe(user => this.user = user);
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.userService.findUserById(id).subscribe(user => {
          this.user = user;
        });
        // this.sharingDataService.findUserByIdEventEmmiter.emit(id);
      }
    });
    this.sharingDataService.newUserEventEmmiter.subscribe(user => {
      this.user = user;
    });
  }

  onSubmit(userForm: NgForm): void {
    // Valida que el formulario este bien
    if (userForm.invalid)
      return;

    this.sharingDataService.newUserEventEmmiter.emit(this.user);
    userForm.reset();
    userForm.resetForm();
  }
}
