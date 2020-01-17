import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { DatosServiceService } from '../../service/datos-service.service';

@Component({
  selector: 'app-datos-pers',
  templateUrl: './datos-pers.component.html',
  styles: []
})
export class DatosPersComponent implements OnInit {

  persona:any;

  constructor(private router:Router ,private rutaActiva: ActivatedRoute,private service:DatosServiceService) {
   
    this.rutaActiva.params.subscribe((data:Params)=>{
       console.log(data);
       let id=data.id;
       console.log(id);
      this.getPersona(id);
    })

   }
   
   

  ngOnInit() {
  }

  getPersona(key$:string){
    this.service.getPersona(key$).subscribe((datos:any)=>{
        console.log(datos);
        let datosPersona={
          id:datos.payload.id,
          nombre:datos.payload._document.proto.fields.nombre.stringValue,
          apellido:datos.payload._document.proto.fields.apellido.stringValue,
          correo:datos.payload._document.proto.fields.correo.stringValue,
          estado:datos.payload._document.proto.fields.estado.stringValue,
          cargo:datos.payload._document.proto.fields.cargo.stringValue
        }
  
        this.persona=datosPersona;
        console.log("********************");
        console.log(this.persona);
        
    })

  }

  editarTrabajador(){
    console.log("Se ha editado el trabajador");
    this.router.navigate(['/modal',this.persona.id]);
  }

}
