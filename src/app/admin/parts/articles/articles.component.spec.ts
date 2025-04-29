import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcticlesComponent } from './articles.component';

describe('ArcticlesComponent', () => {
  let component: ArcticlesComponent;
  let fixture: ComponentFixture<ArcticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
