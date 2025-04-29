import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drag-drop',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './entrepot.component.html',
})
export class EntrepotComponent {
  boxes: { id: number, items: any[] }[] = [];
  items: { name: string, description: string }[] = [];
  newItem = { name: '', description: '' };

  draggedItem: any = null;
  showModal = false;
  selectedBox: any = null;

  constructor() {
    // Générer 50 entrepôts
    this.boxes = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      items: [],
    }));
  }

  addItem() {
    if (this.newItem.name.trim()) {
      this.items.push({ ...this.newItem });
      this.newItem = { name: '', description: '' };
    }
  }

  drag(_event: DragEvent, item: any) {
    this.draggedItem = item;
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: DragEvent, box: any) {
    event.preventDefault();
    if (this.draggedItem) {
      box.items.push(this.draggedItem);
      this.items = this.items.filter(i => i !== this.draggedItem); // Supprimer de la liste disponible
      this.draggedItem = null;
    }
  }

  openBoxDetails(box: any) {
    this.selectedBox = box;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedBox = null;
  }
}

