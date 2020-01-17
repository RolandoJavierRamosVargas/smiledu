import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DatosServiceService {

  constructor(public db: AngularFirestore) { }


  getPersonas(){
    return this.db.collection('items').snapshotChanges();
  }
  getPersona(key$:string){
    return this.db.collection('items/').doc(key$).snapshotChanges();
  }
  crearPersona(persona:any){
    return this.db.collection('items').add(persona);
  }
  actualizarPersona(persona:any){
    let id=persona.id;
    return this.db.doc('items/'+id).update(persona);
  }
  deletePersona(id:string){
    return this.db.doc('items/'+id).delete();
  }
  
}
