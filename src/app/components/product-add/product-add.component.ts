import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  pformGroup?:FormGroup;
  submitted:boolean=false;
  constructor(private formBuilder:FormBuilder, private productService: ProductsService) { }

  ngOnInit(): void {
    this.pformGroup=this.formBuilder.group({
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required],
    });
  }

  onSaveProduct(){
    this.submitted=true;
    if(this.pformGroup.invalid) return;
    this.productService.Save(this.pformGroup.value)
    .subscribe(data=>{
      alert("ADD DONE");
    });
  }

}
