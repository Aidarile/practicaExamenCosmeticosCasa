import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { catchError, map, Observable, of, Subject, switchMap } from 'rxjs';
import { allCosmetics, ApiCosmeticos, Cosmetico } from '../common/interface';


@Injectable({
  providedIn: 'root',
})
export class CosmeticosService {
  private readonly http: HttpClient = inject(HttpClient);

  constructor() {}

  getCosmeticos(): Observable<Cosmetico> {
    return this.http.get<Cosmetico>(environment.urlBase+ 'all');
  }

  getCosmetico(id: string): Observable<Cosmetico> {
    return this.http.get<Cosmetico>(environment.urlBase + 'detail/' + id);
  }

  addCosmetico(cosmetico: Cosmetico): Observable<Cosmetico> {
    return this.http.post<Cosmetico>(environment.urlBase + 'addOne/', cosmetico);
  }

  updateCosmetico(cosmetico: Cosmetico): Observable<Cosmetico> {
    return this.http.put<Cosmetico>(environment.urlBase + 'updateOne/'+ cosmetico._id, cosmetico);
  }

  deleteCosmetico(id: string): Observable<Cosmetico> {
    return this.http.delete<Cosmetico>(environment.urlBase + 'deleteOne/' + id);
  }

  //PAGINACIÓN:
  getCosmeticosByPage(page: number): Observable<Cosmetico>{
    return this.http.get<Cosmetico>(environment.urlBase+'paged?page='+page+'&limit=8');
   }

   //SWITCH-MAP
   filterCosmeticos(name: string): Observable<Cosmetico[]>{
    const API = environment.urlBase+'cosmeticoByName/'+name;
    return this.http.get<Cosmetico[]>(API).pipe(catchError(()=> 
      this.getCosmeticosByPage(1).pipe(map((res:Cosmetico)=> res.cosmeticos.cosmeticos))));  
  }

    private palabra: Subject<string> = new Subject<string>();

    private cosmeticoSearched$: Observable<Cosmetico[]> = this.palabra.pipe(
    switchMap(word => this.filterCosmeticos(word)))

    search(name: string) {
    this.palabra.next(name)
    }

    start(): Observable<Cosmetico[]>{
    return this.cosmeticoSearched$;
    }


}