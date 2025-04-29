import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commande-admin',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.scss'
})
export class CommandeComponent {
    showModal: boolean = false;
    openModal() {
        this.showModal = true;
      }
    
      // Fonction pour fermer la modal
      closeModal() {
        this.showModal = false;
      }
}
