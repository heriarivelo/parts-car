import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FactureComponent } from './facture.component';

describe('FactureComponent', () => {
  let component: FactureComponent;
  let fixture: ComponentFixture<FactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
