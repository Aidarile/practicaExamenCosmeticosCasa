import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { NgbModule, NgbPagination, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ApiCosmeticos, Cosmetico, Pagination } from '../../common/interface';
import { CosmeticosService } from '../../services/cosmeticos.service';
import { Observable, Subject, switchMap } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cosmeticos-list',
  standalone: true,
  imports: [RouterLink, FaIconComponent, NgbModule, NgbPagination, NgbToast, CurrencyPipe],
  templateUrl: './cosmeticos-list.component.html',
  styleUrl: './cosmeticos-list.component.css',
})

export class CosmeticosListComponent {

  private readonly cosmeticoService: CosmeticosService = inject(CosmeticosService);
  private readonly cartService: CartService = inject(CartService);

  cosmeticoList!: Cosmetico[];
  cosmeticos!: ApiCosmeticos;

  // TOAST:
  toast = {
    message: '',
    color: 'bg-success'
  }
  toastShow = false;


  private showToast(message: string, color: string){
    this.toast.message = message;
    this.toast.color = color;
    this.toastShow = true;
    //CUIDADO CON EL SETTIMEOUT QUE IMPORTAS, ASEGURATE QUE RECIBA UNA FUNCIÓN SINO DARÁ ERROR
   setTimeout(() => { 
    this.toastShow = false;
  }, 1500);  
  }
  // FIN  TOAST:


  //PAGINACIÓN:
  currentPage:number = 1; 

  protected loadData() {
    this.cosmeticoService.getCosmeticosByPage(this.currentPage).subscribe(
      {
        next: value => {
          this.cosmeticos = value;
          this.cosmeticoList = value.cosmeticos.cosmeticos;
        },
        complete: () => {
          this.showToast('Cosmeticos loaded successfully', 'bg-success');
        },
        error: err => {
          this.showToast(err.message, 'bg-danger');
        }
      }
    )
  }
  //FIN PAGINACION

    constructor(){   // PARA PAGINACION Y SWITCH-MAP:
      this.loadData();
      this.loadSearch();
    }


  //SWITCH-MAP
    cosmeticos$!: Observable<Cosmetico[]>
    searchTerm$ = new Subject<string>();
    private readonly cosmeticosService: CosmeticosService = inject(CosmeticosService);

  
    private loadSearch() {
      this.cosmeticoService.start().subscribe({
        next: value => {
          this.cosmeticoList = value
        },
        error: err => {
          this.showToast(err.mesage, 'bg-danger')
        }
      })
    }

    buscar(event: any):void {
      this.cosmeticoService.search(event.target.value)
    }
    //FIN SWITCH-MAP


  protected deleteCosmeticos(id: string) {
    this.cosmeticoService.deleteCosmetico(id).subscribe({
      next: (value) => {
        console.log('Cosmetico eliminado');
      },
      error(err) {
        console.log(err);
      },
    });
  }

  //CARRITO DE LA COMPRA:
  addToCart(cosmeticos: Cosmetico) {
    this.cartService.addToCart(cosmeticos)
    }


  //VARIABLE ICONOS: 
  protected readonly faCartShopping = faCartShopping;
  protected readonly faEdit = faEdit;
  protected readonly faTrashCan = faTrashCan;
  protected readonly faMagnifyingGlass = faMagnifyingGlass;


}