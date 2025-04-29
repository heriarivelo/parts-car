import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  dates = [
    {
      image: 'https://cdn.pixabay.com/photo/2021/10/29/12/25/toyota-gr-yaris-6751755_1280.jpg',
      titre: 'Audi RS3',
      lieu: 'Paris',
      prix: '300K Ar',
      places: '7 places',
      vitesse: '22K/H'
    },
    {
      image: 'https://cdn.pixabay.com/photo/2021/10/29/12/25/toyota-gr-yaris-6751755_1280.jpg',
      titre: 'BMW M3',
      lieu: 'Lyon',
      prix: '350K Ar',
      places: '5 places',
      vitesse: '25K/H'
    },
    {
      image: 'https://cdn.pixabay.com/photo/2021/10/29/12/25/toyota-gr-yaris-6751755_1280.jpg',
      titre: 'BMW M3',
      lieu: 'Lyon',
      prix: '350K Ar',
      places: '5 places',
      vitesse: '25K/H'
    },
    // Ajoute d'autres éléments ici
  ];

}
