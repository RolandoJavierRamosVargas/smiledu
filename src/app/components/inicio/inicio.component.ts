import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { DatosServiceService } from '../../service/datos-service.service';
import { Persona } from '../../interfaces/persona';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: []
})
export class InicioComponent implements OnInit {
  


  personas:any[]=[];
  temporal:any[]=[];
  
  constructor(private datosService:DatosServiceService,private router:Router,private modalService: NgbModal) {
   
    this.datosService.getPersonas().subscribe(data=>{
      console.log(data);
      data.forEach((datos:any)=>{
        let datosPersonas={

          id:datos.payload.doc.id,
          nombre:datos.payload.doc._document.proto.fields.nombre.stringValue,
          apellido:datos.payload.doc._document.proto.fields.apellido.stringValue,
          correo:datos.payload.doc._document.proto.fields.correo.stringValue,
          estado:datos.payload.doc._document.proto.fields.estado.stringValue,
          cargo:datos.payload.doc._document.proto.fields.cargo.stringValue
        }
          
          
          console.log(datosPersonas);
          this.temporal.push(datosPersonas);
          
          
      })
      this.personas=this.temporal;
      this.temporal=[];


    })

    
  }


  ngOnInit() {
  }

  getPersona(key:string){
    console.log("Se va a ver la informacion");
    this.router.navigate(['/datospers',key]);
  
  }
  deletePersona(key$){
    this.datosService.deletePersona(key$);
  }



  // existeCorreoUsuario(correo:string){ //Puede ser para verificar si el correo existe en la base de datos
  //   return this.db.collection('items').get().subscribe((data)=>{

  //     data.docs.forEach((data:any) => {
  //       if(data.data().correo==correo){
  //           console.log("Se ha encontrado el correo por favor pruebe otro");
  //       }
        
  //     });
  //       //console.log("Estamos retornando la data",data.docs[0];
  //   });
  // }

  // eliminarUsuario(correo:string){ //Puede ser para verificar si el correo existe en la base de datos
  //   return this.db.collection('items').get().subscribe((data)=>{
      
  //     data.docs.forEach((data:any) => {

  //       let id=data.id;
  //       let haEncontrado=false;

  //       if(data.data().correo==correo){
  //           console.log("Se ha encontrado la data");
  //           haEncontrado=true;
  //           //Eliminar de la base de datos todo el usuar
  //           //debemos obtener la clave id del documento
  //       }
  //       if(haEncontrado){
  //         console.log("El id que se esta buscando es:",id)
  //         this.db.collection('item').doc(id).delete()
  //         .then(()=>{
  //           console.log("Se ha eliminado correctamente");
  //         })
  //         .catch(error=>{
  //           console.log("ha habido un error",error);
  //         })
  //         ;
  //       }
        
  //     });
  //   });
  // }


  // open() {
  //   const modalRef = this.modalService.open(ModalComponent);
  //   modalRef.componentInstance.my_modal_title = 'Este es mi titulo';
  //   modalRef.componentInstance.my_modal_content = 'Este es mi contenido';
  // }

  


}
