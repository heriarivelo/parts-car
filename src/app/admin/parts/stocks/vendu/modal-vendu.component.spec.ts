import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalVenduComponent } from './modal-vendu.component';


describe('ModalVenduComponent', () => {
  let component: ModalVenduComponent;
  let fixture: ComponentFixture<ModalVenduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVenduComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
