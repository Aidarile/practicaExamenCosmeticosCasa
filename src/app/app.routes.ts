import { Routes } from '@angular/router';
import { CosmeticosListComponent } from './components/cosmeticos-list/cosmeticos-list.component';
import { CosmeticosEditComponent } from './components/cosmeticos-edit/cosmeticos-edit.component';
import { CosmeticosCartComponent } from './components/cosmeticos-cart/cosmeticos-cart.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'cosmeticos/list',
        pathMatch: 'full'
    },
    {
        path: 'cosmeticos/list',
        component: CosmeticosListComponent
    },
    {
        path: 'cosmeticos/edit/:id',
        component: CosmeticosEditComponent
    },
    {
        path: 'cosmeticos/add',
        component: CosmeticosEditComponent
    },
    {
        path: 'cosmeticos/cart',
        component: CosmeticosCartComponent
    },
    {
        path: '**',
        redirectTo: 'cosmeticos-list',
        pathMatch: 'full'
    }    
];
