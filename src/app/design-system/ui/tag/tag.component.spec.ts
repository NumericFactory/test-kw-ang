import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagComponent } from './tag.component';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the text : En Stock', () => {
    component.tagText = 'En Stock';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('En Stock');
  });

  it('should have the class badge-success', () => {
    component.tagColor = 'success';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('span').classList).toContain('badge-success');
  });

  it('should have the class badge-warning', () => {
    component.tagColor = 'warning';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('span').classList).toContain('badge-warning');
  });

  it('should have the class badge-danger', () => {
    component.tagColor = 'danger';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('span').classList).toContain('badge-danger');
  });
});
