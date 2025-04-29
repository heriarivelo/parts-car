import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-facture',
  imports: [
    CommonModule,
  ],
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.scss'
})
export class FactureComponent {
    showModal: boolean = false;
    openModal() {
        this.showModal = true;
      }
    
      // Fonction pour fermer la modal
      closeModal() {
        this.showModal = false;
      }
}