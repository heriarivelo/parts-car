import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-test',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  importData: any[] = [];
  description: string = '';
  marge: number | null = null;
  fret: number | null = null;

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/excel/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      this.importData = response.data;
      console.log(this.importData);
    } catch (error) {
      console.error('Erreur upload :', error);
    }
  }

  // validation() {
  //   if (this.importData && this.importData.length > 0) {
  //     if (this.description && this.marge !== null && this.fret !== null) {
  //       const data = {
  //         description: this.description,
  //         marge: this.marge,
  //         fret: this.fret,
  //         importation: this.importData
  //       };
  //       console.log(data);
  //     } else {
  //       console.warn("Veuillez remplir tous les champs : description, marge et fret.");
  //     }
  //   } else {
  //     console.warn("Aucune ligne d'importation disponible.");
  //   }
  // }
  
  validation() {
    if (this.importData && this.description && this.marge !== null && this.fret !== null) {
  
      const cleanedImportData = this.importData.map(item => {
        const base64 = item.photo.split(',')[1]; // Supprime "data:image/jpeg;base64," ou autre prefixe
        return {
          ...item,
          photo: base64
        };
      });
      // Préparer les données à envoyer (importData doit contenir les photos en base64)
      const data = {
        description: this.description,
        marge: this.marge,
        fret: this.fret,
        status: 'Importe',
        importation: cleanedImportData // tableau avec photo base64 dans chaque item
      };
  
      axios.post('http://localhost:5000/api/import', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        
        console.log('Succès :', response.data);
        alert('Importation réussie !');
      })
      .catch(error => {
        console.error('Erreur lors de l\'importation :', error);
        alert('Erreur lors de l\'importation.');
      });
  
    } else {
      alert('Veuillez remplir tous les champs et sélectionner des fichiers.');
    }
  }
  
  
}
