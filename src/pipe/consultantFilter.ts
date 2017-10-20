import {Pipe, PipeTransform, Injectable, Component} from '@angular/core';

@Pipe({
    name: 'consultantFilter'
})
export class ConsultantPipe implements PipeTransform {

    transform(items: any, filter: any): any {
       if (filter.length > 0) {
           items = items.filter((v: any) => (v.nom.toLowerCase().indexOf(filter.toLowerCase()) !== -1) || 
           //(Object.keys(v.competences).forEach(function(key) {v.competences[key].toLowerCase().indexOf(filter.toLowerCase()) !== -1; console.log(v.competences[key])  }))  ||           
           (v.tribu.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||
           (v.poste.titre.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||           
           (v.poste.societe.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||                       
           (v.prenoms.toLowerCase().indexOf(filter.toLowerCase()) !== -1));
         return items;
      } else {
          return items;
      }
    }
}