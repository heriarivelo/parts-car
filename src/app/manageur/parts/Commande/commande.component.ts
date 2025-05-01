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
  totalPrice: any;


  calculateTotalPrice() {
    this.totalPrice = this.selectedCommande?.articles.reduce((total: number, article: any) => {
      return total + (article.prix_article * article.quantite);
    }, 0);
  }
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
referenceFacture: any;
status: any;

  // Ouvre le modal pour afficher les détails de la commande
  async openDetailModal(referencecommande: any) {
    // const url = 'http://localhost:5000/api/facture';
    
    console.log(referencecommande);
    const params = {
      reference_commande: referencecommande
    }
    try {
      const response = await axios.get('http://localhost:5000/api/facture', { params });
      this.selectedCommande = response.data.commande;
      console.log(this.selectedCommande);
      this.calculateTotalPrice();
      
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
  
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
  async validerFacture(): Promise<void> {
    if (!this.selectedCommande) {
      console.error('Commande non sélectionnée');
      return;
    }
    let referenceCommandes = this.selectedCommande?.commande?.reference;
  
    // Vérification des données nécessaires
    if ( !this.totalPrice || !this.status) {
      console.error('Données manquantes pour la facture');
      if (!this.totalPrice) console.error('Total price manquant');
      if (!this.status) console.error('Status manquant');
      return;
    }
  
    // Préparation des données de la facture
    const factureData = {
      prix_total: this.totalPrice, // Assurez-vous que totalPrice est un nombre
      reference_commande: referenceCommandes,
      reference_fact: this.referenceFacture,
      status: this.status,
      type_remise: 'espece',  // Remise en espèces, ajustez si nécessaire
      remise: 12000,  // Remise fixe de 12000, ajustez si nécessaire
    };
  
    console.log('Données de la facture:', factureData);
  
    try {
      // Envoi de la requête POST avec les données formatées
      const response = await axios.post('http://localhost:5000/api/facture/valider', factureData);
  
      if (response.data) {
        console.log('Facture validée avec succès:', response.data);
        this.closeModal();  
      } else {
        console.error('Erreur lors de la validation de la facture:', response.data.message || 'Erreur inconnue');
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel API:', error);
      alert('Une erreur est survenue lors de la validation de la facture');
    }
  }
  
  
  
}
