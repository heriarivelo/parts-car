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
  articles: any[] = [];  // articles est un tableau pour *ngFor
  page: number = 1;
  totalPages: number = 1;
  limit: number = 10;
  searchQuery: string = ''; 

  ngOnInit(): void {
    this.loadArticles(this.page);
  }

  // loadArticles(page: number): void {
  //   const requestData = {
  //     page: page,
  //     limit: this.limit,
  //     searchQuery: this.searchQuery  // côté backend, ne filtre pas sur code_art !
  //   };
  
  //   axios.post('http://localhost:5000/api/article', requestData)
  //     .then(response => {
  //       if (response.data && Array.isArray(response.data.results)) {
  //         this.articles = response.data.results;
  //         this.page = response.data.page || this.page;
  //         this.totalPages = response.data.totalPages || this.totalPages;
  //         console.log(this.articles);
  //       } else {
  //         this.articles = [];
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Il y a eu une erreur en récupérant les articles:", error);
  //       this.articles = [];
  //     });
  // }
  loadArticles(page: number): void {
    const requestData = {
      page: page,
      limit: this.limit,
      searchQuery: this.searchQuery // côté backend, ne filtre pas sur code_art !
    };
  
    axios.post('http://localhost:5000/api/article', requestData)
      .then(response => {
        if (response.data && Array.isArray(response.data.results)) {
          // On prépare les articles
          this.articles = response.data.results.map((article: any) => {
            // Ajouter le préfixe base64 à la photo si nécessaire
            if (article.photo && !article.photo.startsWith('data:image')) {
              article.photo = `data:image/png;base64,${article.photo}`;
            }
  
            // Gérer aussi les photos dans importation (si présentes)
            if (Array.isArray(article.importation)) {
              article.importation = article.importation.map((item: any) => {
                return {
                  ...item,
                  photo: item.photo && !item.photo.startsWith('data:image')
                    ? `data:image/png;base64,${item.photo}`
                    : item.photo
                };
              });
            }
  
            return article;
          });
  
          this.page = response.data.page || this.page;
          this.totalPages = response.data.totalPages || this.totalPages;
          console.log(this.articles);
        } else {
          this.articles = [];
        }
      })
      .catch(error => {
        console.error("Il y a eu une erreur en récupérant les articles:", error);
        this.articles = [];
      });
  }
  

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadArticles(this.page);
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadArticles(this.page);
    }
  }
}
