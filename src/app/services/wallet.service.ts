import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { walletItemDTO, walletItemCreationDTO } from 'src/wallet/wallet.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/wallet';

  getAll() : Observable<walletItemDTO[]>{
    var ciao = this.http.get<walletItemDTO[]>(this.apiURL);
    console.log(this.apiURL);
    console.log(ciao);
    return this.http.get<walletItemDTO[]>(this.apiURL);

    //return [{Id:"abcdefg", Name: "Spesona",Value: 0, Type:"Expense", Category: "", Date: new Date()}];
  }

  // cerca l'item per nome con paginazione
  getByName(name:string, sortOrder: string, pageNumber: number, pageSize: number) : Observable<walletItemDTO[]>{
    console.log(`getByName ${name}, ${sortOrder}, ${pageNumber}, ${pageSize}`);

    let path: string;
    path = `${this.apiURL}/byname/${name}/${sortOrder}/${pageNumber}/${pageSize}`;

    var results = this.http.get<walletItemDTO[]>(path); 

    // var results = this.http.get<walletItemDTO[]>(this.apiURL + '/byname',{
    //   params: new HttpParams()
    //     .set('name', name)
    //     .set('sortOrder', sortOrder)
    //     .set('pageNumber', pageNumber.toString())
    //     .set('pageSize', pageNumber.toString())
    // }); 

    console.log(results);
    return results; 

  }

  getCategories() : Observable<string[]>{
    return this.http.get<string[]>(this.apiURL + '/categories');

  }

  create(walletItem: walletItemCreationDTO) {
    return this.http.post(this.apiURL, walletItem);
  }

  delete(Id: string){
    //alert(`${this.apiURL}/${Id}`);
    //return this.http.delete(`${this.apiURL}/${Id}`);
    this.http.delete(`${this.apiURL}/${Id}`).subscribe(() => console.log(`${Id} deleted`));
  }
}

