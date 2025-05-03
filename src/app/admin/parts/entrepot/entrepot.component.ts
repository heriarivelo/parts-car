import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-drag-drop',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './entrepot.component.html',
})
export class EntrepotComponent {
  boxes: { id: number, name: String, items: any[] }[] = [];
  items: { code_art: string, lib1: string , quantite: number , prix_final: number }[] = [];
  newItem = { name: '', description: '' };

  errors: String = '';

  draggedItem: any = null;
  showModal = false;
  selectedBox: any = null;
  articleCode: String = '';
  notFound: boolean = false;
  okay: boolean = false;

  entrepot_libelle: String = '';
  
  ngOnInit(): void {
    this.loadEntrepots();  
  }

  async loadEntrepots() {
    try {
      const response = await axios.get('http://localhost:5000/api/entrepot');
      this.boxes = response.data.map((entrepot: { id: number; libelle: string }) => ({
        name: entrepot.libelle,
        id: entrepot.id,
        items: []
      }));
    } catch (error) {
      console.error("Erreur lors du chargement des entrepôts", error);
    }
  }
  async addItem() {
    try {
      const response = await axios.get(`http://localhost:5000/api/stock/one?code_art=${this.articleCode}`);
      if (response.data && response.data.length > 0) {
        response.data[0].quantite = response.data[0].quantite - response.data[0].quantite_vendu;
        this.items.push({...response.data[0]});
        this.okay = true;

      } else {
        this.errors = 'Aucun article';
        this.notFound = true;

      }
    } catch (error) {
      console.error("Erreur de recherche de l'article", error);
      this.notFound = false;
    }
    // if (this.newItem.name.trim()) {
    //   this.items.push({ ...this.newItem });
    //   this.newItem = { name: '', description: '' };
    // }
  }

  drag(_event: DragEvent, item: any ) {
    this.draggedItem = item;

  }

  updateEntrepot(boxId: number, articleId: number) {
    const payload = {
      stockId: articleId,
      entrepotId: boxId
    };

    axios.put('http://localhost:5000/api/stock', payload)
      .then(() => {
        console.log('Changement du stock ajouté à l\'entrepôt');
      })
      .catch((error) => {
        console.error('Erreur lors Changement du stock d\'entrepôt', error);
      });
  }

  async NewEntrepot() {

    await axios.post('http://localhost:5000/api/entrepot', { libelle: this.entrepot_libelle })
      .then(() => {
        this.entrepot_libelle = '';
        window.location.reload();
        console.log('Entrepot ajouté à l\'entrepôt');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de l\'entrepot dans l\'entrepôt', error);
      });
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  // drop(event: DragEvent, box: any) {
  //   event.preventDefault();
  //   if (this.draggedItem) {
  //     box.items.push(this.draggedItem);
  //     console.log(box)
  //     // this.updateEntrepot(box.id, this.draggedItem.id);
  //     this.items = this.items.filter(i => i !== this.draggedItem); // Supprimer de la liste disponible
  //     this.draggedItem = null;
  //   }
  // }
  drop(event: DragEvent, box: any) {
    event.preventDefault();
    if (this.draggedItem) {
      console.log(box);
      this.updateEntrepot(box.id, this.draggedItem.id);
      // this.items = this.items.filter(i => i !== this.draggedItem); // Supprimer de la liste disponible
      this.draggedItem = null;
    }
  }

  async openBoxDetails(box: any) {
    try {
      const response = await axios.get(`http://localhost:5000/api/stock/entrepot?entrepotId=${box.id}`);
      if (response.data && response.data.length > 0) {
        box.items = response.data;
      }
    } catch (error) {
      console.error("Erreur de recherche de l'article", error);
    }
    this.selectedBox = box;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedBox = null;
  }
}

