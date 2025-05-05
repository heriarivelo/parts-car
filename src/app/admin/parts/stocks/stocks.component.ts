import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface InventoryItem {
  reference: string;
  name: string;
  category: string;
  brand: string;
  quantity: number;
  price: number;
  status: string;
}

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss'
})
export class StocksComponent {
  isEditMode = false;
  currentItem: InventoryItem | null = null;

  inventoryItems: InventoryItem[] = [
    {
      reference: 'REF-001',
      name: 'Plaquettes de frein avant',
      category: 'Freinage',
      brand: 'BOSCH',
      quantity: 24,
      price: 45.99,
      status: 'En stock'
    },
    {
      reference: 'REF-002',
      name: 'Filtre à huile',
      category: 'Moteur',
      brand: 'MANN FILTER',
      quantity: 5,
      price: 12.50,
      status: 'Faible stock'
    },
    {
      reference: 'REF-003',
      name: 'Bougie d\'allumage',
      category: 'Moteur',
      brand: 'NGK',
      quantity: 0,
      price: 8.99,
      status: 'Épuisé'
    },
    // Ajoutez d'autres éléments selon besoin
  ];

  getStatusClass(status: string): string {
    switch(status) {
      case 'En stock':
        return 'bg-green-100 text-green-800';
      case 'Faible stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Épuisé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

}
