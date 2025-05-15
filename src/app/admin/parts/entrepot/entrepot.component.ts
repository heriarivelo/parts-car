import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-drag-drop',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './entrepot.component.html',
  styleUrls: ['./entrepot.component.scss'],
})
export class EntrepotComponent {

  searchInput: string = '';
  searchResults: any[] = [];
  showSearchModal: boolean = false;

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

    axios.put('http://localhost:5000/api/stock/entrepots', payload)
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

  selectedFile: File | null = null;

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}

async submitExcel(): Promise<void> {
  if (!this.selectedFile) {
    alert('Veuillez sélectionner un fichier Excel.');
    return;
  }

  const reader = new FileReader();

  reader.onload = async (e: ProgressEvent<FileReader>) => {
    try {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      const stocks = jsonData.map((row) => ({
        CODE_ART: row.CODE_ART || '',
        marque1_marque2: row.marque1_marque2 || '',
        oem1_oem2: row.oem1_oem2 || '',
        auto_final: row.auto_final || '',
        LIB1: row.LIB1 || '',
        Qte: row.Qte || 0,
        entrepots: row.Entrepots || ''
      }));

      const response = await axios.put('http://localhost:5000/api/stock/entreports/import', { stocks });

      const notFoundStocks = response.data.notFoundStocks || [];

      if (notFoundStocks.length > 0) {
        const stockList = notFoundStocks
          .map((stock: any) => `- ${stock.code_art} (${stock.marque1_marque2}, ${stock.oem1_oem2})`)
          .join('\n');

        alert(`⚠️ Certains articles n'ont pas été trouvés dans la base de données :\n\n${stockList}`);
      } else {
        alert('✅ Tous les stocks ont été importés avec succès.');
      }

      console.log('Réponse serveur :', response.data);

    } catch (error) {
      console.error('❌ Erreur lors de l’envoi des stocks à l’API :', error);
      alert('Erreur lors de l’importation des stocks.');
    }
  };

  reader.readAsArrayBuffer(this.selectedFile);
}

searchArticleFromApi(): void {
  if (!this.searchInput) {
    alert('Veuillez entrer un code article à rechercher.');
    return;
  }

  axios.get(`http://localhost:5000/api/stocks?code=${this.searchInput}`)
    .then(res => {
      this.searchResults = res.data;
      this.showSearchModal = true;
    })
    .catch(err => {
      console.error('Erreur lors de la recherche', err);
      alert('Aucun article trouvé ou erreur serveur.');
    });
}

async deleteEntrepot(id: number, event: Event) {
  event.stopPropagation();

  const confirmation = confirm('Voulez-vous vraiment supprimer cet entrepôt ?');
  if (!confirmation) return;

  try {
    await axios.delete(`http://localhost:5000/api/entrepot/${id}`);
    this.boxes = this.boxes.filter(box => box.id !== id);
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    alert('Échec de la suppression de l\'entrepôt.');
  }
}

}