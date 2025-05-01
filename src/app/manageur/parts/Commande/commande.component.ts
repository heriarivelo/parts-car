import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  commandes: any[] = [];
  selectedCommande: any = null;  // Pour stocker la commande sélectionnée

  filters = {
    reference: '',
    status: '',
    startDate: '',
    endDate: '',
    page: 1,
    pageSize: 10
  };

  showModal: boolean = false;
  showDetailModal: boolean = false;

  // Ouvre le modal pour afficher les détails de la commande
  openDetailModal(reference: any) {
    const url = 'http://localhost:5000/api/facture';
  
    // Axios GET request with data in the body
    axios({
      method: 'get',        // Méthode GET
      url: url,
      headers: {            // Si vous avez besoin de spécifier des headers
        'Content-Type': 'application/json'
      },
      data: {               // Corps de la requête
        reference_commande: reference
      }
    })
    .then(response => {
      console.log('Réponse de l\'API:', response.data);
      if (response.data.commande.success) {
        this.selectedCommande = response.data.commande;  // Stocke la commande et ses articles
      } else {
        alert('Échec de la récupération des informations de la commande');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des informations:', error);
      alert('Une erreur est survenue lors de la récupération des informations de la commande.');
    });
  
    this.showDetailModal = true;
  }
  
  
  
  closeModal() {
    this.showDetailModal = false;
  }

  constructor() {}

  ngOnInit(): void {
    this.fetchCommandes();
  }

  // Récupère la liste des commandes
  async fetchCommandes(): Promise<void> {
    const params = {
      reference: this.filters.reference,
      status: this.filters.status,
      startDate: this.filters.startDate,
      endDate: this.filters.endDate,
      page: this.filters.page.toString(),
      limit: this.filters.pageSize.toString(),
    };
    try {
      const response = await axios.get('http://localhost:5000/api/commande', { params });
      this.commandes = response.data.data;
      // console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
  }

  onSearch(): void {
    this.fetchCommandes();
  }

  // Fonction pour valider la commande et envoyer les données au backend
  async validerFacture(): Promise<void> {
    if (!this.selectedCommande) {
      console.error('Commande non sélectionnée');
      return;
    }

    const factureData = {
      reference_commande: this.selectedCommande.reference,
      reference_fact: '',  // Ajouter la référence facture si nécessaire
      prix_total: this.selectedCommande.total_commande,
      type_remise: 'espece',  // Par défaut, vous pouvez ajuster en fonction des besoins
      remise: 12000,
      status: 'validé'  // Statut par défaut, ajuster si nécessaire
    };

    try {
      const response = await axios.post('http://localhost:5000/api/facture/valider', factureData);
      console.log('Facture validée avec succès:', response.data);
      // Vous pouvez mettre à jour l'interface après la validation si nécessaire
      this.closeModal();  // Ferme le modal après validation
    } catch (error) {
      console.error('Erreur lors de la validation de la facture:', error);
    }
  }
}
