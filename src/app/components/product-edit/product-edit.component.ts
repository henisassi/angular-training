import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId:number;
  pformGroup?:FormGroup;
  constructor(private activatedRoute: ActivatedRoute,private productService:ProductsService,private formBuilder:FormBuilder) {
    this.productId=activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId)
    .subscribe(product=>{
      this.pformGroup=this.formBuilder.group({
        id:[product.id,Validators.required],
      name:[product.name,Validators.required],
      price:[product.price,Validators.required],
      quantity:[product.quantity,Validators.required],
      selected:[product.selected,Validators.required],
      available:[product.available ,Validators.required],
      })

    });
  }

  onEditProduct(){
    if(this.pformGroup.invalid) return;
    this.productService.updateProduct(this.pformGroup.value)
    .subscribe(data=>{
      alert("Update DONE");
    });
  }

}
