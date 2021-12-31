import { HttpClient, HttpParams } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { of, Observable, pipe } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { FamilyDTO } from 'src/app/models/family-model.';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class FamilyService {
  
    constructor(private http: HttpClient) { }
  
    // endpoint del servizio wbe
    private apiURL = environment.apiURL + '/family';
  
    getAll() : Observable<FamilyDTO[]>{
        var ciao = this.http.get<FamilyDTO[]>(this.apiURL);
        console.log(this.apiURL);
        console.log(ciao);
        return this.http.get<FamilyDTO[]>(this.apiURL);
    
        //return [{Id:"abcdefg", Name: "Spesona",Value: 0, Type:"Expense", Category: "", Date: new Date()}];
      }

    /*
    // lista degli oggetti di portafoglio (ingressi/uscite)
    private items: walletItemDTO[] = [];
  
    private filteredItems: walletItemDTO[] = [];
  
    getAll() : Observable<walletItemDTO[]>{
      var ciao = this.http.get<walletItemDTO[]>(this.apiURL);
      console.log(this.apiURL);
      console.log(ciao);
      return this.http.get<walletItemDTO[]>(this.apiURL);
  
      //return [{Id:"abcdefg", Name: "Spesona",Value: 0, Type:"Expense", Category: "", Date: new Date()}];
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
  
    // richiama una pagina di item di portafoglio
    page(request: PageRequest<walletItemDTO>, query: WalletItemQuery) : Observable<Page<walletItemDTO>>{
      
      //let filteredItems = this.items;
  
  //console.log('page: ' + this.apiURL + `/filter/${query.search}`);
  
  
       this.http.get<walletItemDTO[]>(this.apiURL + `/filter/${query.search ? query.search : "*"}`)
      .pipe(map(data => {
        this.filteredItems = data;
        console.log('page filteredItems');
        console.log(this.filteredItems);
      })).subscribe(wallet => {});
  

        // ocio che questa viene eseguita priam della subscribe
      const start = request.page * request.size;
      const end = start + request.size;
  
      const pageItems = this.filteredItems.slice(start,end);
  
      console.log(`pageItems: ${this.apiURL}/filter/${query.search ? query.search : "*"}`);
      console.log(pageItems);
      console.log(`start(${start}) stop(${end}) length (${this.filteredItems.length})`);
      
      const page = {
        content: pageItems,
        number: request.page,
        size: pageItems.length,
        totalElements: this.filteredItems.length
      };
      return of(page).pipe(delay(500));
    }
    */
  }