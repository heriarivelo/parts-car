import { CommonModule, DecimalPipe } from "@angular/common";
import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-modal-vendu',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
    ],
    templateUrl: './modal-vendu.component.html',
    providers: [DecimalPipe],
  })
export class ModalVenduComponent {
    show: boolean = true;
    @Input() produitsVendus: any[] = [];
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['produits']) {
          console.log('Produits reçus dans la modale :', this.produitsVendus);
        }
      }
      ngOnInit(): void {
        console.log(this.produitsVendus);
      }
    get chiffreAffaire(): number {
        return this.produitsVendus.reduce((total, produit) => total + parseFloat(produit.prix_total), 0);
      }

    @Output() close = new EventEmitter<void>();

    onClose() {
      this.close.emit();
    }
  }
  