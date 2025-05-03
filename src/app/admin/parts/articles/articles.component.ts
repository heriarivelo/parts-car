import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: any = { results: [] };
  page: number = 1;
  totalPages: number = 1;
  limit: any = 10;
  code_art: any;
  marque1_marque2: any;
  oem1_oem2: any;
  auto_final: any;
  lib1: any;

  ngOnInit(): void {
    this.loadArticles(this.page);
  }
  loadArticles(page: number): void {
  
    const requestData = {
      page: page,
      limit: this.limit,
      code_art: this.code_art,
      marque1_marque2: this.marque1_marque2,
      oem1_oem2: this.oem1_oem2,
      auto_final: this.auto_final,
      lib1: this.lib1
    };
  
    axios.post('http://localhost:5000/api/article', requestData)
      .then(response => {
        console.log(response.data);
        
        if (response.data) {
          this.articles = response.data.results; 
          this.page = response.data.page || this.page;
          this.totalPages = response.data.totalPages || this.totalPages; 
        }
      })
      .catch(error => {
        console.error("Il y a eu une erreur en récupérant les articles:", error);
      });
  }
  
  
  // Pour naviguer à la page suivante
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadArticles(this.page);
    }
  }

  // Pour revenir à la page précédente
  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadArticles(this.page);
    }
  }
}
