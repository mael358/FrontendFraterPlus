import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'form-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-item.component.html'
})
export class FormItemComponent {

  @Output() addItemEventEmitter = new EventEmitter();

  @Input() counterId = 0;

  item: any = {
    product: '',
    price: '',
    quantity: ''
  }

  public addItem(itemForm: NgForm) {
    if (itemForm.valid) {
      this.addItemEventEmitter.emit({
        id: this.counterId++,
        product: this.item.product,
        price: this.item.price,
        quantity: this.item.quantity
      });
      this.item.product = '';
      this.item.price = '';
      this.item.quantity = '';
  
      itemForm.reset();
      itemForm.resetForm();
    }
  }

}
