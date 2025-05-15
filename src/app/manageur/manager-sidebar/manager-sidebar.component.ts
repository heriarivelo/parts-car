import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manager-sidebar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './manager-sidebar.component.html',
  styleUrls: ['./manager-sidebar.component.scss']
})
export class ManagerSidebarComponent {
    showCommande = false;
}
