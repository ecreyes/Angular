import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalizado'})
export class CapitalizadoPipe implements PipeTransform {
    transform(value:string): any {
        let texto:string = "";
        value = value.toLocaleLowerCase();
        let arr = value.split(" ");
        for(let i of arr){
            texto = texto + i[0].toUpperCase() + i.substring(1)+" ";
        }
        return texto;
    }
}