import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListViewComponent } from './products-list-view.component';
import { ProductStore } from '../data/product.store';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('ProductsListViewComponent', () => {
  let component: ProductsListViewComponent;
  let fixture: ComponentFixture<ProductsListViewComponent>;
  let storeService, componentStoreService;
  let el: HTMLElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsListViewComponent],
      providers: [
        provideHttpClient(), // Provide the HttpClient along with HttpClientTesting
        provideHttpClientTesting(),
        ProductStore
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // UserService actually injected into the component
    storeService = TestBed.inject(ProductStore);
    componentStoreService = storeService;
    // UserService from the root injector
    storeService = TestBed.inject(ProductStore);
    //  get the "welcome" element by CSS selector (e.g., by class name)
    // el = fixture.nativeElement.querySelector('.welcome');


  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
