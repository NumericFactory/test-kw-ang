import { Component, Input } from '@angular/core';
import { TagComponent } from '../../../design-system/ui/tag/tag.component';
import { ButtonComponent } from '../../../design-system/ui/button/button.component';
import { CommonModule } from '@angular/common';
import { availabilityStatus, Product } from '../../data/product.model';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [TagComponent, ButtonComponent, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input({ required: true }) product!: Product;

  getTagColor(product: Product): 'success' | 'warning' | 'danger' {
    const availabilityStatus: availabilityStatus = product.availabilityStatus;
    if (availabilityStatus === 'In Stock') {
      return 'success';
    } else if (availabilityStatus === 'Low Stock') {
      return 'warning';
    } else {
      return 'danger';
    }
  }

}
