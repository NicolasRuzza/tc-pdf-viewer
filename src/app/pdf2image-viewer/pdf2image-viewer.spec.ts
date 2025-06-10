import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pdf2imageViewer } from './pdf2image-viewer';

describe('Pdf2imageViewer', () => {
  let component: Pdf2imageViewer;
  let fixture: ComponentFixture<Pdf2imageViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pdf2imageViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pdf2imageViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
