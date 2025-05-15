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

showDetailModal: any;
showVenduModal: any;
selectedProductDetail: any;
selectedProductVendu: any;
searchQuery: string = '';
page: number = 1;
totalPages: number = 1;
limit: number = 10;


  ngOnInit(): void {
    this.rechercher(this.page);
  }

  async rechercher(page: number): Promise<void> {
    const params = {
      searchQuery: this.searchQuery,
      page: page,
      limit: this.limit.toString(),
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
      console.log(response.data);
      
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
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.rechercher(this.page);
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.rechercher(this.page);
    }
  }
}
