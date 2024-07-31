import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../data/product.model';
import { mockProduct } from '../../data/fake-product.data';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product title', () => {
    console.log(fixture.nativeElement)
    expect(fixture.nativeElement.querySelector('h3.title').textContent).toContain('Playstation4');
  });

  it('should return success for In Stock', () => {
    component.product.availabilityStatus = 'In Stock';
    expect(component.getTagColor(component.product as Product)).toEqual('success');
  });

  it('should return warning for Low Stock', () => {
    component.product.availabilityStatus = 'Low Stock';
    expect(component.getTagColor(component.product as Product)).toEqual('warning');
  });

  it('should return danger for Out Of Stock', () => {
    component.product.availabilityStatus = 'Out Of Stock';
    expect(component.getTagColor(component.product as Product)).toEqual('danger');
  });
});
