import { EventDriverService } from 'src/app/services/event.driver.service';
import { Product } from 'src/app/model/product.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product?:Product|null=null;
 // @Output() eventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();

  constructor(private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {
  }

  onSelect(product: Product){
    //this.eventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCTS,payload:product});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.SELECT_PRODUCTS,payload:product});
  }

  onEdit(product: Product){
   // this.eventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCTS,payload:product});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.EDIT_PRODUCTS,payload:product});
  }

  onDelete(product: Product){
    //this.eventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCTS,payload:product});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.DELETE_PRODUCTS,payload:product});
  }

}
