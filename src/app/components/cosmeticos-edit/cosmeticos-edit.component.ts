import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CosmeticosService } from './../../services/cosmeticos.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cosmeticos-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './cosmeticos-edit.component.html',
  styleUrl: './cosmeticos-edit.component.css'
})

export class CosmeticosEditComponent implements OnInit {

  private readonly cosmeticoService: CosmeticosService = inject(CosmeticosService);

  private readonly router: Router = inject(Router);

  // FORMULARIO: 
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  @Input('id')id!: string;

  formCosmetico: FormGroup = this.formBuilder.group({
    _id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    price: [0, [Validators.required]]
  })


  // GETERS del formulario:
  get name(): any {
    return this.formCosmetico.get('name');
  }

  get image(): any {
    return this.formCosmetico.get('image');
  }

  get type(): any {
    return this.formCosmetico.get('type');
  }

  get brand(): any {
    return this.formCosmetico.get('brand');
  }

  get price(): any {
    return this.formCosmetico.get('price');
  }

  // TOAST:
  toast = {
    message: '',
    color: 'bg-success'
  }
  toastShow = false;


  private showToast(message: string, color: string, duration: number){
    this.toast.message = message;
    this.toast.color = color;
    this.toastShow = true;
    //CUIDADO CON EL SETTIMEOUT QUE IMPORTAS, ASEGURATE QUE RECIBA UNA FUNCIÓN SINO DARÁ ERROR
   setTimeout(() => { 
    this.toastShow = false;
  }, duration);  
  }
  // FIN  TOAST:
  
  edit: boolean = false;
  load: boolean = false;

ngOnInit(): void {
  if (this.id) {
    this.load = true;
    this.edit = true;
    this.cosmeticoService.getCosmetico(this.id).subscribe(
      {
        next: value => {
          this.formCosmetico.setValue(value);
          this.showToast('Cosmetic loaded successfully!', 'bg-success', 1200)
        },
        error: err => {
          this.showToast(err.message, 'bg-danger', 2200)
        }
      }
    )
  } else {
    this.edit = false;
    this.load = true;
    this.formCosmetico.reset();
  }
}

onSubmit() {
  if (this.formCosmetico.invalid) {
    this.formCosmetico.markAllAsTouched();
    return;
  }
  if (this.edit) {
    this.cosmeticoService.updateCosmetico(
      this.formCosmetico.getRawValue()).subscribe(
        {
          next: value => {
            this.showToast(
              value.name + ' updated successfully!', 'bg-success', 1200)
          },
          error: err => {
            this.showToast(
              err.message, 'bg-danger', 2200)
          }
        }
      )
  } else {
    this.cosmeticoService.addCosmetico( 
      this.formCosmetico.getRawValue()).subscribe(
        {
          next: value => {
            this.showToast(
              value.name + ' added successfully!', 'bg-success', 1200)
          },
          error: err => {
            this.showToast(
              err.message, 'bg-danger', 2200)
          }
        }
      )
  }
}


}
