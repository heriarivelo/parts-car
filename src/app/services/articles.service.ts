import { Injectable } from '@angular/core';
import { Article } from '../models/articles.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: Article[] = [];

  addArticle(article: Article) {
    this.articles.push(article);
  }

  setArticles(articles: Article[]) {
    this.articles = articles;
  }

  getArticles(): Article[] {
    return this.articles;
  }
}
