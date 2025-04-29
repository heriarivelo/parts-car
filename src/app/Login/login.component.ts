import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = '';
  currentRole: string = ''; 

  constructor(private router: Router) {}

  login() {
    if (this.email && this.password && this.role) {
      // Sauvegarde du rôle dans localStorage
      localStorage.setItem('userRole', this.role);

      // Redirection vers la page appropriée selon le rôle
      if (this.role === 'admin') {
        this.router.navigate(['/admin-tableau-de-bord']);
      } else if (this.role === 'manager') {
        this.router.navigate(['/manager/tableau-de-bord']);
      }
    } else {
      // Afficher une erreur si des champs sont vides
      console.error('Veuillez remplir tous les champs');
    }
  }
}
