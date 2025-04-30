import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-commande-manager',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeMComponent implements OnInit {
  showModal: boolean = false;
  commandes: any[] = []; // Contiendra les données récupérées de l'API
  total: number = 0;
  page: number = 1;
  pageSize: number = 10;

  // Propriétés pour les filtres
  filter = {
    marquePiece: '',
    marqueVehicule: '',
    status: '',
    search: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getCommandes();  // Récupérer les commandes au démarrage du composant
  }

  // Méthode pour récupérer les commandes depuis l'API avec les filtres
  getCommandes() {
    axios.get(`http://localhost:5000/api/commande`, {
      params: {
        page: this.page,
        pageSize: this.pageSize,
        marquePiece: this.filter.marquePiece,
        marqueVehicule: this.filter.marqueVehicule,
        status: this.filter.status,
        search: this.filter.search
      }
    })
    .then((response) => {
      const data = response.data;
      this.commandes = data.data;
      this.total = data.total;
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des commandes:', error);
    });
  }

  // Méthode pour réinitialiser les filtres
  resetFilters() {
    this.filter = {
      marquePiece: '',
      marqueVehicule: '',
      status: '',
      search: ''
    };
    this.getCommandes(); // Rafraîchir les commandes avec les filtres réinitialisés
  }

  // Méthode pour naviguer vers la page de commande
  pagerej() {
    this.router.navigate(['/manager/commande/new']);
  }


  supprimerCommande(index: number) {
    this.commandes.splice(index, 1);
  }

  // Méthode pour naviguer vers la page de commande suivante
  pageSuivante() {
    if (this.page * this.pageSize < this.total) {
      this.page++;
      this.getCommandes();  // Charger les commandes suivantes
    }
  }

  // Méthode pour naviguer vers la page de commande précédente
  pagePrecedente() {
    if (this.page > 1) {
      this.page--;
      this.getCommandes();  // Charger les commandes précédentes
    }
  }
}
