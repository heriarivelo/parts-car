import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  shipments = [
    { id: 1, name: "Expédition 1", date: "2024-04-01", status: "En cours" },
    { id: 2, name: "Expédition 2", date: "2024-04-05", status: "Livré" },
    { id: 3, name: "Expédition 3", date: "2024-04-10", status: "En attente" }
  ];

  boutiqueItems = [
    { id: 1, name: "Pièce A", price: "50€", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Pièce B", price: "75€", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Pièce C", price: "100€", image: "https://via.placeholder.com/150" }
  ];
  showImportModal: boolean = false;
  selectedFileName: string | null = null;
  updateExisting = false;
  addNewPieces = false;

  ngOnInit(): void {
    this.renderShipments();
    this.renderBoutique();
    this.setupTabs();
  }
  openImportModal() {
    this.showImportModal = true;
  }

  // Fonction pour fermer la modal
  closeImportModal() {
    this.showImportModal = false;
  }

  // Fonction pour effectuer l'importation
  importFile() {
    if (!this.selectedFileName) {
      alert('Veuillez sélectionner un fichier avant d\'importer.');
      return;
    }

    // Logique d'importation du fichier (exemple de traitement)
    console.log('Importation du fichier:', this.selectedFileName);
    console.log('Mettre à jour les pièces existantes:', this.updateExisting);
    console.log('Ajouter les nouvelles pièces:', this.addNewPieces);

    // Simuler l'importation et fermer la modal
    this.closeImportModal();
  }


  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
    }
  }


  renderShipments() {
    const shipmentList = document.getElementById('shipment-list');
    if (shipmentList) {
      shipmentList.innerHTML = ''; // Vider avant de remplir
      this.shipments.forEach((shipment) => {
        const div = document.createElement('div');
        div.className = 'bg-white p-6 rounded-lg shadow-md';
        div.innerHTML = `
          <h3 class="text-xl font-semibold mb-2">${shipment.name}</h3>
          <p class="text-gray-600 mb-2">Date : ${shipment.date}</p>
          <p class="text-gray-800 font-medium">Statut : ${shipment.status}</p>
        `;
        shipmentList.appendChild(div);
      });
    }
  }

  renderBoutique() {
    const boutiqueList = document.getElementById('boutique-list');
    if (boutiqueList) {
      boutiqueList.innerHTML = ''; // Vider avant de remplir
      this.boutiqueItems.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'bg-white p-6 rounded-lg shadow-md flex flex-col items-center';
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="w-32 h-32 mb-4 object-cover rounded">
          <h3 class="text-xl font-semibold mb-2">${item.name}</h3>
          <p class="text-gray-800 font-medium">${item.price}</p>
        `;
        boutiqueList.appendChild(div);
      });
    }
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

}
