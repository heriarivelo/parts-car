import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import axios from 'axios';

@Component({
  selector: 'app-entrepot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule // Importer le module de Drag-and-Drop
  ],
  templateUrl: './entrepot.component.html',
  styleUrls: ['./entrepot.component.css']
})
export class EntrepotComponent implements OnInit {
  boxes: any[] = [];  // Liste des entrepôts
  articleCode: string = '';  // Code de l'article à rechercher
  foundArticle: any = null;  // Détails de l'article trouvé
  selectedBox: any = null;  // Entrepôt sélectionné pour afficher les détails
  notFound: boolean = false;  // Indicateur si l'article est trouvé ou non
  showModal: boolean = false;  // Indicateur pour afficher ou non le modal

  ngOnInit(): void {
    this.loadEntrepots();  // Charger les entrepôts dès le chargement du composant
  }

  // Charger les entrepôts depuis l'API
  async loadEntrepots() {
    try {
      const response = await axios.get('http://localhost:5000/api/entrepot');
      this.boxes = response.data.map((entrepot: { id: number; libelle: string }) => ({
        id: entrepot.id,
        libelle: entrepot.libelle,
        items: []  // Initialisation des articles pour chaque entrepôt
      }));
    } catch (error) {
      console.error("Erreur lors du chargement des entrepôts", error);
    }
  }

  // Recherche d'un article par son code
  async searchArticle() {
    try {
      const response = await axios.get(`http://localhost:5000/api/stock/one?code_art=${this.articleCode}`);
      if (response.data && response.data.length > 0) {
        this.foundArticle = response.data[0];  // Premier article trouvé
        this.notFound = false;
      } else {
        this.foundArticle = null;
        this.notFound = true;
      }
    } catch (error) {
      console.error("Erreur de recherche de l'article", error);
      this.foundArticle = null;
      this.notFound = true;
    }
  }

  // Déplacer l'article vers l'entrepôt sélectionné via drag-and-drop
  dropArticle(event: any, box: any) {
    const article = event.item.data;  // Récupérer l'article déplacé
    if (article && box) {
      // Ajouter l'article dans l'entrepôt
      box.items.push(article);
      this.updateEntrepot(box.id, article.id);
    }
  }

  // Mettre à jour l'entrepôt avec le nouvel article
  updateEntrepot(boxId: number, articleId: number) {
    const payload = {
      stockId: articleId,
      entrepotId: boxId
    };

    axios.put('http://localhost:5000/api/stocks/update-entrepot', payload)
      .then(() => {
        console.log('Article ajouté à l\'entrepôt');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de l\'article dans l\'entrepôt', error);
      });
  }

  // Ouvrir les détails d'un entrepôt dans un modal
  openBoxDetails(box: any) {
    this.selectedBox = box;
    this.showModal = true;
  }

  // Fermer le modal
  closeModal() {
    this.showModal = false;
    this.selectedBox = null;
  }
}

