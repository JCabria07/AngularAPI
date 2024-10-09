import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsServiceService } from './Services/products.service.service';
import { CardProductComponent } from "./card-product/card-product.component";
import { environment } from '../environments/environment.development';
import { NavbarComponent } from "./navbar/navbar.component";
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardProductComponent, NavbarComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'AppAngular';
  public response: any = {};
  constructor(private httpSrv: ProductsServiceService) {
  }
  
  public async ngOnInit(){
    this.response = await this.httpSrv.get(environment.URL_FAKE_API + "products");
    console.log(this.response);    
  }

  public async categorySelected(category: string){
    // we call again the service to make a response in the API.
    if(category == ''){
      this.response = await this.httpSrv.get(environment.URL_FAKE_API + "products");
    }
    else{
      this.response = await this.httpSrv.get(environment.URL_FAKE_API + "products/category/" + category)
    }
  }
}
