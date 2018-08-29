import { Injectable } from '@angular/core';

@Injectable()
export class NinjasService {
    private ninjas:any[] = [
        {
           id: 0,
           nombre: "Boruto",
           bio: "Boruto Uzumaki (うずまきボルト, Uzumaki Boruto) es el protagonista del manga y anime Boruto: Naruto Next Generations. Es un habitante de Konohagakure miembro del Clan Uzumaki y descendiente directo del Clan Hyūga por parte materna, hijo del Séptimo Hokage, Naruto Uzumaki y Hinata Hyūga, así como el hermano mayor de Himawari Uzumaki. Actualmente es un Genin que forma parte del Equipo Konohamaru junto a Sarada Uchiha y Mitsuki. Aunque inicialmente tenía un resentimiento contra su padre por no pasar tiempo con su familia debido a su puesto como Hokage, Boruto eventualmente se reconcilió con él y lo empezó a respetar, tomando también la meta de volverse como su maestro, Sasuke Uchiha, un soporte para el Hokage y la aldea.",
           img: "assets/img/boruto.png",
           aparicion: "Capítulo #700",
           casa:"Konoha"
         },
         {
           id: 1,
           nombre: "Itachi",
           bio: "tachi Uchiha (うちはイタチ, Uchiha Itachi) era el hermano mayor de Sasuke Uchiha. Fue un prodigioso shinobi de Konohagakure infiltrado en la organización ANBU como un doble espía. Después de masacrar al Clan Uchiha, se unió a Akatsuki donde su compañero asignado fue Kisame Hoshigaki, en el anime su primer compañero fue Jūzō Biwa. Llevaba el anillo Escarlata (朱, Shu) en el dedo anular derecho.",
           img: "assets/img/itachi.png",
           aparicion: "Capítulo #139",
           casa:"Akatsuki"
         },
         {
           id: 2,
           nombre: "Sakura",
           bio: "Sakura Haruno (春野サクラ, Haruno Sakura) cuyo nombre actual es Sakura Uchiha (うちはサクラ, Uchiha Sakura) es uno de los personajes principales de la serie. Es una kunoichi de nivel Jōnin, miembro del Equipo Kakashi y una gran amiga de Naruto Uzumaki. Después de su entrenamiento con Tsunade, se convierte en una Ninja Médico. Finalmente se convirtió en la esposa de Sasuke Uchiha y en madre de Sarada Uchiha.",
           img: "assets/img/sakura.png",
           aparicion: "Capítulo #1",
           casa: "Konoha"
         },
         {
           id: 3,
           nombre: "Kakashi",
           bio: "Kakashi Hatake (はたけカカシ, Hatake Kakashi) es un shinobi de Konohagakure. Fue un Jōnin, ex-ANBU y el líder del Equipo 7. Fue conocido mundialmente por su uso del Sharingan, lo que le valió el apodo de Kakashi el Ninja que Copia (コピー忍者のカカシ, Kopi Ninja no Kakashi) y Kakashi del Sharingan (写輪眼のカカシ, Sharingan no Kakashi). En su adolescencia fue alumno de Minato Namikaze y compañero de equipo de Obito Uchiha y Rin Nohara. También fue el capitán de la Tercera División de la Gran Alianza Shinobi. Después de los acontecimientos de la Cuarta Guerra Mundial Shinobi, Kakashi se convirtió en el Sexto Hokage (六代目火影, Rokudaime Hokage; que significa Sexta Sombra del Fuego) de Konoha.",
           img: "assets/img/kakashi.png",
           aparicion: "Capítulo #3",
           casa:"Konoha"
         },
         {
           id: 4,
           nombre: "Naruto",
           bio: "Naruto Uzumaki (うずまきナルト, Uzumaki Naruto) es el protagonista de la serie del manga y anime Naruto y Naruto Shippūden. Asimismo es partícipe del manga y anime Boruto: Naruto Next Generations, secuela canónica de la obra original de Masashi Kishimoto.",
           img: "assets/img/naruto-pelicula.png",
           aparicion: "Capítulo #1",
           casa: "Konoha"
         },
         {
           id: 5,
           nombre: "Pain",
           bio: "Nagato (長門, Nagato), mejor conocido como Pain (ペイン, Pein), era uno de los más poderosos shinobi, y el líder reconocido de Akatsuki y de Amegakure. Todos los miembros de Akatsuki se referían a él como “Líder”, excepto Konan quien lo llamaba por su nombre, Pain",
           img: "assets/img/pain.png",
           aparicion: "Capítulo #372",
           casa: "Akatsuki"
         },
         {
           id: 6,
           nombre: "Sasuke",
           bio: "Sasuke Uchiha (うちはサスケ, Uchiha Sasuke) es el deuteragonista de la serie y uno de los supervivientes del Clan Uchiha. Es hijo de Fugaku Uchiha y Mikoto Uchiha, hermano de Itachi Uchiha, así como la Reencarnación actual de Indra Ōtsutsuki.",
           img: "assets/img/sasuke.png",
           aparicion: "Capítulo #1",
           casa: "Konoha"
         }
    ];
    constructor(){
    }

    getNinjas(){
        return this.ninjas;
    }

    getNinjaById(id:number){
      return this.ninjas[id];
    }

    buscarNinja(texto:string){
      let ninjaArr:any[] = [];
      texto = texto.toLowerCase();
      for(let ninja of this.ninjas){
        let nombre:string = ninja.nombre.toLowerCase();
        if(nombre.indexOf(texto)>=0){
          ninjaArr.push(ninja);
        }
      }
      return ninjaArr;
    }
}