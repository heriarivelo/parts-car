import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output ,SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-modal-detail',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule
    ],
    templateUrl: './modal-detail.component.html'
  })
export class ModalDetailComponent {

    show: boolean = true;
    @Input() produits: any; // Get the product detail from the parent component

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['produits']) {
          console.log('Produits reçus dans la modale :', this.produits);
        }
      }
      ngOnInit(): void {
        console.log(this.produits);
      }


    get totalQuantiteVendue(): number {
        if (Array.isArray(this.produits)) {
            return this.produits.reduce((total: number, p: { quantite_vendu: number; }) => total + p.quantite_vendu, 0);
        }
        return 0;
    }
      

    @Output() close = new EventEmitter<void>();

    onClose() {
      this.close.emit();
    }
    onModifier() {
    }
    onSupprimer() {

    }
}
