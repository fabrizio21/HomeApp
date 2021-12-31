import { walletItemDTO } from "./wallet.model";
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { WalletService } from "src/app/services/wallet.service";
import { catchError, finalize } from "rxjs/operators";

export class WalletDataSource extends DataSource<walletItemDTO> {

    private walletSubject = new BehaviorSubject<walletItemDTO[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public length : number = 0;

    constructor(private walletService: WalletService) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<walletItemDTO[]> {
        //console.log("WalletDataSource.Connect");
        //return this.walletService.getAll();
        return this.walletSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.walletSubject.complete();
        this.loadingSubject.complete();
    }

    /*
    findWalletItem(
        name = '', 
        sortOrder = 'asc',
        pageNumber = 0,
        pageSize = 3
    ) {
        this.loadingSubject.next(true);

        console.log('name: ' + name);

        this.walletService.getByName(name, sortOrder, pageNumber, pageSize)
        .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(walletItems => {
            this.walletSubject.next(walletItems);
            this.length = walletItems.length;
            console.log('cristo: ' + walletItems.length);
        });
    }
    */       
}