// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import axios from 'axios';

// @Component({
//   selector: 'app-commande-manager',
//   imports: [
//     CommonModule,
//     FormsModule
//   ],
//   templateUrl: './commande.component.html',
//   styleUrls: ['./commande.component.scss']
// })
// export class CommandeMComponent implements OnInit {
//   showModal: boolean = false;
//   commandes: any[] = []; // Contiendra les données récupérées de l'API
//   total: number = 0;
//   page: number = 1;
//   pageSize: number = 10;

//   // Propriétés pour les filtres
//   filter = {
//     marquePiece: '',
//     marqueVehicule: '',
//     status: '',
//     search: ''
//   };

//   constructor(private router: Router) {}

//   // ngOnInit(): void {
//     // this.getCommandes();  // Récupérer les commandes au démarrage du composant
//   // }

//   // Méthode pour récupérer les commandes depuis l'API avec les filtres
//   // getCommandes() {
//   //   axios.get(`http://localhost:5000/api/commande`, {
//   //     params: {
//   //       page: this.page,
//   //       pageSize: this.pageSize,
//   //       marquePiece: this.filter.marquePiece,
//   //       marqueVehicule: this.filter.marqueVehicule,
//   //       status: this.filter.status,
//   //       search: this.filter.search
//   //     }
//   //   })
//   //   .then((response) => {
//   //     const data = response.data;
//   //     this.commandes = data.data;
//   //     this.total = data.total;
//   //   })
//   //   .catch((error) => {
//   //     console.error('Erreur lors de la récupération des commandes:', error);
//   //   });
//   // }

//   // Méthode pour réinitialiser les filtres
//   // resetFilters() {
//   //   this.filter = {
//   //     marquePiece: '',
//   //     marqueVehicule: '',
//   //     status: '',
//   //     search: ''
//   //   };
//   //   this.getCommandes(); // Rafraîchir les commandes avec les filtres réinitialisés
//   // }

//   // Méthode pour naviguer vers la page de commande
//   pagerej() {
//     this.router.navigate(['/manager/commande/new']);
//   }


//   supprimerCommande(index: number) {
//     this.commandes.splice(index, 1);
//   }

//   // Méthode pour naviguer vers la page de commande suivante
//   pageSuivante() {
//     if (this.page * this.pageSize < this.total) {
//       this.page++;
//       // this.getCommandes();  // Charger les commandes suivantes
//     }
//   }

//   // Méthode pour naviguer vers la page de commande précédente
//   pagePrecedente() {
//     if (this.page > 1) {
//       this.page--;
//       this.getCommandes();  // Charger les commandes précédentes
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-commandes',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandesComponent implements OnInit {
  commandes = [];
  filter = {
    marquePiece: '',
    marqueVehicule: '',
    status: '',
    search: ''
  };
  page = 1;
  pageSize = 5;  // Nombre de commandes par page
  total = 0;

  ngOnInit() {
    // Charger les commandes depuis localStorage
    this.loadCommandes();
  }

  loadCommandes() {
    const storedCommandes = localStorage.getItem('commandes');
    if (storedCommandes) {
      this.commandes = JSON.parse(storedCommandes);
      this.total = this.commandes.length;
    }
  }

  pagerej() {
    // Rediriger vers la page de nouvelle commande
    // Exemple de redirection :
    // this.router.navigate(['/nouvelle-commande']);
  }

  // Filtrer les commandes selon les critères sélectionnés
  // get filteredCommandes() {
  //   return this.commandes.filter(commande => {
  //     return (
  //       (this.filter.marquePiece === '' || commande.marquePiece === this.filter.marquePiece) &&
  //       (this.filter.marqueVehicule === '' || commande.marqueVehicule === this.filter.marqueVehicule) &&
  //       (this.filter.status === '' || commande.status === this.filter.status) &&
  //       (this.filter.search === '' || commande.reference.includes(this.filter.search))
  //     );
  //   }).slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  // }
  commandesDta = JSON.parse(localStorage.getItem('commandes') || '[]'); // Charger les commandes depuis localStorage

  // Fonction pour générer la facture en PDF
  genererFacture(reference: string): void {
    // Trouver la commande par référence
    const commande = this.commandesDta.find((cmd: { reference: string; }) => cmd.reference === reference);

    if (!commande) {
      alert('Commande introuvable!');
      return;
    }

    // Créer le document PDF
    const doc = new jsPDF();

    // Titre de la facture
    doc.setFontSize(20);
    doc.text('Facture', 105, 20, null, null, 'center');

    // Détails de la commande
    doc.setFontSize(12);
    doc.text(`ID Commande: ${commande.id}`, 20, 30);
    doc.text(`Référence: ${commande.reference}`, 20, 40);
    doc.text(`Description: ${commande.description}`, 20, 50);
    doc.text(`Prix: ${commande.prix} €`, 20, 60);
    doc.text(`Client: ${commande.mail_phone}`, 20, 70);

    // Date et autres informations (si nécessaire)
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date de la facture: ${currentDate}`, 20, 80);

    // Sauvegarder ou afficher la facture
    doc.save(`facture_${commande.reference}.pdf`);
  }

  pagePrecedente() {
    if (this.page > 1) {
      this.page--;
    }
  }

  pageSuivante() {
    if (this.page * this.pageSize < this.total) {
      this.page++;
    }
  }
}
