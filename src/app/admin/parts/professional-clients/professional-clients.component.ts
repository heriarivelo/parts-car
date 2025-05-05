import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface ProfessionalClient {
  id: number;
  name: string;
  siret: string;
  address: string;
  postalCode: string;
  city: string;
  activity: string;
  contactName: string;
  contactPosition: string;
  phone: string;
  email: string;
  revenue: number;
  orderCount: number;
  lastOrderDate: Date;
  balanceDue: number;
  status: 'Actif' | 'Inactif' | 'En retard';
  paymentTerms: number;
  creditLimit: number;
  lastOrders: {
    orderNumber: string;
    date: Date;
    amount: number;
    status: 'Payé' | 'En attente' | 'En retard';
  }[];
  notes: {
    author: string;
    date: Date;
    content: string;
  }[];
}

@Component({
  selector: 'app-professional-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './professional-clients.component.html',
  styleUrls: ['./professional-clients.component.css']
})
export class ProfessionalClientsComponent implements OnInit {
  allClients: ProfessionalClient[] = [];
  filteredClients: ProfessionalClient[] = [];
  paginatedClients: ProfessionalClient[] = [];
  
  selectedClient: ProfessionalClient | null = null;
  showClientModal = false;
  isEditMode = false;
  clientForm: FormGroup;
  
  searchTerm = '';
  clientStatusFilter = 'all';
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  
  // Stats
  stats = {
    activeClients: 0,
    growthRate: 0,
    avgRevenue: 0,
    monthlyOrders: 0,
    totalDebt: 0
  };

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      siret: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      activity: ['', Validators.required],
      contactName: ['', Validators.required],
      contactPosition: [''],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      paymentTerms: [30],
      creditLimit: [5000]
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.calculateStats();
  }

  loadClients(): void {
    // Simuler des données de clients
    this.allClients = [
      {
        id: 1,
        name: 'Garage du Centre',
        siret: '12345678901234',
        address: '12 Rue de la République',
        postalCode: '75001',
        city: 'Paris',
        activity: 'Garage automobile',
        contactName: 'Jean Dupont',
        contactPosition: 'Gérant',
        phone: '01 23 45 67 89',
        email: 'contact@garageducentre.fr',
        revenue: 12500,
        orderCount: 24,
        lastOrderDate: new Date('2023-06-15'),
        balanceDue: 1250,
        status: 'Actif',
        paymentTerms: 30,
        creditLimit: 10000,
        lastOrders: [
          { orderNumber: 'CMD-2023-024', date: new Date('2023-06-15'), amount: 520, status: 'Payé' },
          { orderNumber: 'CMD-2023-022', date: new Date('2023-05-28'), amount: 780, status: 'Payé' },
          { orderNumber: 'CMD-2023-018', date: new Date('2023-04-10'), amount: 1250, status: 'Payé' }
        ],
        notes: [
          { author: 'Admin', date: new Date('2023-05-10'), content: 'Client très satisfait de la dernière livraison' },
          { author: 'Commercial', date: new Date('2023-03-15'), content: 'A demandé une augmentation de crédit à 10 000€' }
        ]
      },
      // Ajouter d'autres clients de démo...
    ];
    
    this.filterClients();
  }

  calculateStats(): void {
    const activeClients = this.allClients.filter(c => c.status === 'Actif').length;
    const totalRevenue = this.allClients.reduce((sum, client) => sum + client.revenue, 0);
    const totalDebt = this.allClients.reduce((sum, client) => sum + client.balanceDue, 0);
    
    this.stats = {
      activeClients,
      growthRate: Math.round((activeClients / this.allClients.length) * 100),
      avgRevenue: totalRevenue / this.allClients.length,
      monthlyOrders: this.allClients.reduce((sum, client) => sum + Math.floor(client.orderCount / 12), 0),
      totalDebt
    };
  }

  filterClients(): void {
    this.filteredClients = this.allClients.filter(client => {
      // Filtre par statut
      if (this.clientStatusFilter === 'active' && client.status !== 'Actif') {
        return false;
      }
      if (this.clientStatusFilter === 'inactive' && client.status !== 'Inactif') {
        return false;
      }
      if (this.clientStatusFilter === 'overdue' && client.status !== 'En retard') {
        return false;
      }
      
      // Filtre par recherche
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        return (
          client.name.toLowerCase().includes(term) ||
          client.contactName.toLowerCase().includes(term) ||
          client.city.toLowerCase().includes(term) ||
          client.phone.includes(term))
      }
      
      return true;
    });
    
    // Réinitialiser la pagination
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredClients.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedClients = this.filteredClients.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, this.currentPage - 2);
      let end = Math.min(this.totalPages, start + maxVisiblePages - 1);
      
      if (end - start + 1 < maxVisiblePages) {
        start = end - maxVisiblePages + 1;
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  viewClientDetails(client: ProfessionalClient): void {
    this.selectedClient = client;
  }

  openAddClientModal(): void {
    this.isEditMode = false;
    this.clientForm.reset();
    this.showClientModal = true;
  }

  openEditModal(client: ProfessionalClient): void {
    this.isEditMode = true;
    this.clientForm.patchValue(client);
    this.showClientModal = true;
  }

  closeClientModal(): void {
    this.showClientModal = false;
    this.clientForm.reset();
  }

  saveClient(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }
    
    const formValue = this.clientForm.value;
    
    if (this.isEditMode) {
      // Mettre à jour le client existant
      const index = this.allClients.findIndex(c => c.id === formValue.id);
      if (index !== -1) {
        this.allClients[index] = { ...this.allClients[index], ...formValue };
      }
    } else {
      // Ajouter un nouveau client
      const newClient: ProfessionalClient = {
        ...formValue,
        id: Math.max(...this.allClients.map(c => c.id)) + 1,
        revenue: 0,
        orderCount: 0,
        lastOrderDate: new Date(),
        balanceDue: 0,
        status: 'Actif',
        lastOrders: [],
        notes: []
      };
      this.allClients.unshift(newClient);
    }
    
    this.filterClients();
    this.calculateStats();
    this.closeClientModal();
  }

  sendReminder(client: ProfessionalClient): void {
    if (confirm(`Envoyer une relance à ${client.name}?`)) {
      // Implémenter l'envoi de relance
      console.log('Relance envoyée à:', client.email);
    }
  }

  editClient(client: any): void {
    // Exemple de traitement
    console.log('Édition du client :', client);
  }
  

  exportToExcel(): void {
    // Implémenter l'export Excel
    console.log('Export des clients vers Excel');
  }
}