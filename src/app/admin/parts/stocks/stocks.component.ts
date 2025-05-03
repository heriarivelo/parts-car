import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { ModalDetailComponent } from "./detaile/modal-detail.component";
import { ModalVenduComponent } from "./vendu/modal-vendu.component";

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalDetailComponent,
    ModalVenduComponent
],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss'
})
export class StocksComponent implements OnInit {

  produits: any[] = [];

  filtres = {
    lib1: '',
    marque: '',
    oem: '',
    auto: '',
    page: 1,
    limit: 10
  };
showDetailModal: any;
showVenduModal: any;
selectedProductDetail: any;
selectedProductVendu: any;

  ngOnInit(): void {
    this.rechercher();
  }

  async rechercher(): Promise<void> {
    const params = {
      lib1: this.filtres.lib1,
      marque: this.filtres.marque,
      oem: this.filtres.oem,
      auto: this.filtres.auto,
      page: this.filtres.page.toString(),
      limit: this.filtres.limit.toString(),
    };

    try {
      const response = await axios.get('http://localhost:5000/api/stock', { params });
      this.produits = response.data.results;
    } catch (error) {
      console.error('Erreur API :', error);
    }
  }

  async openDetail(lib1: string) {
    try {
      this.showDetailModal = true;
      const response = await axios.get(`http://localhost:5000/api/stock/detail?lib=${lib1}`);
      this.selectedProductDetail = response.data; 
      // console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }

  
  async openVendu(lib1: string) {
    try {
      this.showVenduModal = true;
      const response = await axios.get(`http://localhost:5000/api/stock/vendu?lib=${lib1}`);
      this.selectedProductVendu = response.data; 
      // console.log(response.data);

    } catch (error) {
      console.error('Error fetching sold product details:', error);
    }
  }
  closeVendu() {
    this.showVenduModal = false;
    
  }
  closeDetail() {
    this.showDetailModal = false;
   
  }
}
