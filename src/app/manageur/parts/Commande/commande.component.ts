import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commande-manager',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.scss'
})
export class CommandeMComponent {
    showModal: boolean = false;
  constructor(private router: Router) {}

    page(){
      this.router.navigate(['/manager/commande/new']);
    }
    commandes: any[] = [
      {
        contact: '032 84 222 00 / exemple@gmail.com',
        reference: 'REF-001',
        description: 'Filtre à huile BOSCH',
        prix: 120000,
        quantite: 1,
        status: 'Disponible'
      }
    ];
  
    ajouterCommande() {
      this.commandes.push({
        contact: '032 11 222 00 / nouveau@gmail.com',
        reference: 'REF-NEW',
        description: 'Nouvelle pièce',
        prix: 90000,
        quantite: 1,
        status: 'Disponible'
      });
    }
  
    supprimerCommande(index: number) {
      this.commandes.splice(index, 1);
    }
}
