import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';  // Importer la bibliothèque xlsx

@Component({
  selector: 'app-importation',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './importation.component.html',
  styleUrl: './importation.component.scss'
})
export class ImportationComponent {
  showImportModal: boolean = false;
  selectedFileName: string | null = null;
  updateExisting = false;
  addNewPieces = false;
  description: string = '';
  marge: number | null = null;
  fret: number | null = null;
  shipments: any[] = [];

  ngOnInit(): void {
    this.renderShipments();
    this.renderBoutique();
    this.setupTabs();
  }

  openImportModal() {
    this.showImportModal = true;
  }

  closeImportModal() {
    this.showImportModal = false;
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.readExcel(file);
    }
  }

  async readExcel(file: File) {
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Attendre la conversion de chaque image en Base64
      this.shipments = await Promise.all(jsonData.map(async (row: any) => ({
        codeArt: row["CODE_ART"],
        marque: row["marque1_marque2"],
        oem: row["oem1_oem2"],
        autoFinal: row["auto_final"],
        lib1: row["LIB1"],
        qte: row["Qte"],
        qteArv: row["qte_arv"],
        prixUnit: row["PRIX_UNIT"],
        poidsNet: row["POIDS_NET"],
        prixDeVente: row["prix_de_vente"],
        photo: await this.convertImageToBase64(row["photo"])
      })));

      this.renderShipments();
    };
    reader.readAsBinaryString(file);
    this.closeImportModal();
  }

  async convertImageToBase64(imagePath: string): Promise<string> {
    if (imagePath.startsWith('data:image')) {
      return imagePath;
    }

    const img = new Image();
    img.src = imagePath;

    return new Promise<string>((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL();
        resolve(base64);
      };
      img.onerror = reject;
    });
  }

  renderShipments() {
    const shipmentsList = document.getElementById('shipments-list');
    if (shipmentsList) {
      shipmentsList.innerHTML = ''; 

      this.shipments.forEach((shipment) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${shipment.codeArt}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${shipment.marque}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${shipment.oem}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${shipment.autoFinal}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${shipment.lib1}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${shipment.qte}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${shipment.qteArv}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${shipment.prixUnit}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${shipment.poidsNet}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${shipment.prixDeVente}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <img src="${shipment.photo}" alt="photo" class="w-16 h-16 object-contain" />
          </td>

        `;

        shipmentsList.appendChild(row);
      });
    }
  }

  renderBoutique() {
    // Vous pouvez ajouter un rendu pour la section Boutique ici si nécessaire.
  }

  setupTabs() {
    const tabImport = document.getElementById('tab-import');
    const tabBoutique = document.getElementById('tab-boutique');
    const sectionImport = document.getElementById('section-import');
    const sectionBoutique = document.getElementById('section-boutique');

    if (tabImport && tabBoutique && sectionImport && sectionBoutique) {
      tabImport.addEventListener('click', () => {
        sectionImport.classList.remove('hidden');
        sectionBoutique.classList.add('hidden');
        tabImport.classList.add('border-b-2', 'border-primary', 'text-primary');
        tabBoutique.classList.remove('border-b-2', 'border-primary', 'text-primary');
        tabBoutique.classList.add('text-gray-600');
      });

      tabBoutique.addEventListener('click', () => {
        sectionImport.classList.add('hidden');
        sectionBoutique.classList.remove('hidden');
        tabBoutique.classList.add('border-b-2', 'border-primary', 'text-primary');
        tabImport.classList.remove('border-b-2', 'border-primary', 'text-primary');
        tabImport.classList.add('text-gray-600');
      });
    }
  }

  onSubmit() {
    console.log('Description:', this.description);
    console.log('Marge:', this.marge);
    console.log('Fret:', this.fret);
    console.log('Mettre à jour les pièces existantes:', this.updateExisting);
    console.log('Ajouter les nouvelles pièces:', this.addNewPieces);

    alert('Importation réussie');
    this.closeImportModal();
  }
}
