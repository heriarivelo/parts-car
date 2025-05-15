import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

interface Facture {
  id: number;
  reference_commande: string;
  reference_fact: string;
  prix_total: number;
  status: number; // 0 = En attente, 1 = Payée
}

@Component({
  selector: 'app-facture',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureMComponent implements OnInit {
  reference_fact: string = '';
  openDetailModal(arg0: string) {
    this.reference_fact = arg0;
    throw new Error('Method not implemented.');
  }
  factures: Facture[] = [];

  constructor() {}

  ngOnInit(): void {
    // Données simulées — à remplacer par un appel au service HTTP si nécessaire
   this.loadFacture();
  }

  async loadFacture() {
    try {
      const response = await axios.get('http://localhost:5000/api/facture//All');
      this.factures = response.data.rows;
    } catch (error) {
      console.error("Erreur lors du chargement des entrepôts", error);
    }
  }
}
