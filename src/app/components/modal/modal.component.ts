import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatosServiceService } from 'src/app/service/datos-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements OnInit {

  // @Input() my_modal_title;
  // @Input() my_modal_content;

  persona:any
  id:string;

  forma:FormGroup;

  constructor(private rutaActiva: ActivatedRoute,private service:DatosServiceService) {
    console.log("Se esta ejecutando el componente");
    this.validarCampos();
      this.rutaActiva.params.subscribe(data=>{
        this.id=data.id;
        if(data.id!='nuevo'){
          console.log(data.id);
          this.getPersona(data.id);
        }
        


      })
    

   }

   getPersona(key$:string){
     console.log("Se esta imprimiedo getPersona")
    this.service.getPersona(key$).subscribe((datos:any)=>{
        console.log(datos);
        let datosPersona={

          id:datos.payload.id,
          nombre:datos.payload._document.proto.fields.nombre.stringValue,
          apellido:datos.payload._document.proto.fields.apellido.stringValue,
          correo:datos.payload._document.proto.fields.correo.stringValue,
          estado:datos.payload._document.proto.fields.estado.stringValue,
          cargo:datos.payload._document.proto.fields.cargo.stringValue,
          salario:datos.payload._document.proto.fields.salario.stringValue,
        }
  
        this.persona=datosPersona;
        console.log("********************");
        console.log(this.persona);
        this.forma
        this.validarCampos();
        
    })

  }
 

  submit(){

    
    if(this.id=='nuevo'){
      //crear usuario

      let usuario:any = {
        nombre: this.forma.value.nombre,
        apellido: this.forma.value.apellido,
        correo:this.forma.value.correo,
        cargo:this.forma.value.cargo,
        estado:"este estado es de prueba",
        salario:this.forma.value.salario
  
      }

      this.service.crearPersona(usuario)
      .then(()=>{
        console.log("Se ha creado la persona con exito");
      })
      .catch((error)=>{
        console.log("Ha habido un error al crear a la persona ",error);
      });
    }else{
      //actualizar datos
      console.log("Se han actualizado los datos");
      let usuario:any = {
        id:this.id,
        nombre: this.forma.value.nombre,
        apellido: this.forma.value.apellido,
        correo:this.forma.value.correo,
        cargo:this.forma.value.cargo,
        estado:"este estado es de prueba",
        salario:this.forma.value.salario
  
      }
      console.log(usuario);
      this.service.actualizarPersona(usuario);
    }
    
  }

  //  agregarUsuario(){

  //   let usuario:any = {
  //     nombre: this.forma.value.nombre,
  //     apellido: this.forma.value.apellido,
  //     correo:this.forma.value.correo,
  //     cargo:this.forma.value.cargo,
  //     estado:"este estado es de prueba"

  //   }

  //     this.db.collection('items').add(usuario);
  //     console.log("*****************");
  //     console.log(usuario);
  //     console.log("Se ha agregado el usuario");
      
    
  // }
  validarCampos(){
    if(this.persona !=null){
      this.forma = new FormGroup({

        'nombre': new FormControl(this.persona.nombre ,  [
                                          Validators.required,
                                          Validators.minLength(3)
                                        ]),
        'apellido': new FormControl(this.persona.apellido, [
                                          Validators.required
                                        ]),
        'correo': new FormControl(this.persona.correo,   [
                                        Validators.required,
                                        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                      ]),
        'cargo': new FormControl(this.persona.cargo,   [
                                        Validators.required
                                      ]),
        'salario': new FormControl(this.persona.salario,   [
                                        Validators.required
                                      ])

    })
    }
    else{
      this.forma = new FormGroup({

        'nombre': new FormControl('' ,  [
                                          Validators.required,
                                          Validators.minLength(3)
                                        ]),
        'apellido': new FormControl('', [
                                          Validators.required
                                        ]),
        'correo': new FormControl('',   [
                                        Validators.required,
                                        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                      ]),
        'cargo': new FormControl('',   [
                                        Validators.required
                                      ]),
        'salario': new FormControl('',   [
                                        Validators.required
                                      ])
    })
    }
    
  }

  ngOnInit() {
  }

  // existeCorreoUsuario(correo:string){ //Puede ser para verificar si el correo existe en la base de datos
  //   return this.db.collection('items').get().subscribe((data)=>{
  //     let existeCorreo:boolean=false;
  //     data.docs.forEach((data:any) => {
  //       if(data.data().correo==correo){
  //           console.log("Se ha encontrado el correo por favor pruebe otro");
  //           existeCorreo=true;
  //           return existeCorreo;
  //       }
        
  //     });
  //       //console.log("Estamos retornando la data",data.docs[0];
  //   });
  // }

  // guardar(){
  //   this.agregarUsuario();

  // }

  

}
