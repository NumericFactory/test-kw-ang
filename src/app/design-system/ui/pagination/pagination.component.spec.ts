import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current page', () => {
    component.currentPage = 2;
    component.total = 3;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('span').textContent).toContain('2');
  });

  it('should display the total number of pages', () => {
    component.currentPage = 2;
    component.total = 3;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('span').textContent).toContain('3');
  });

  it('the 2 buttons should be disabled', () => {
    component.currentPage = 1;
    component.total = 1;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button.previous').disabled).toBeTruthy();
    expect(fixture.nativeElement.querySelector('button.next').disabled).toBeTruthy();
  });

  it('the 2 buttons should be enabled', () => {
    component.currentPage = 2;
    component.total = 3;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button.previous').disabled).toBeFalsy();
    expect(fixture.nativeElement.querySelector('button.next').disabled).toBeFalsy();
  });

  it('the previous button should be disabled', () => {
    component.currentPage = 1;
    component.total = 2;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button.previous').disabled).toBeTruthy();
  });

  it('the next button should be disabled', () => {
    component.currentPage = 2;
    component.total = 2;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button.next').disabled).toBeTruthy();
  });

  it('should emit pageChanged event after 500ms', fakeAsync(() => {
    spyOn(component.pageChanged, 'emit');
    component.currentPage = 2;
    component.total = 3;
    fixture.detectChanges();
    component.nextPage();
    tick(500);
    expect(component.pageChanged.emit).toHaveBeenCalled();
  }));

  it('should emit pageChanged event only once after 3 clicks, and current page to be 5', fakeAsync(() => {
    spyOn(component.pageChanged, 'emit');
    component.currentPage = 2;
    component.total = 5;
    fixture.detectChanges();
    component.nextPage();
    component.nextPage();
    component.nextPage();
    tick(500);
    expect(component.pageChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.currentPage).toBe(5);
  }));

});
