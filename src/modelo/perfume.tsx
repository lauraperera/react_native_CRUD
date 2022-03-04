export class Perfume {
  
    constructor() {
}
   // constructor(id?: number, nome?: string, email?: string) {
   //   this.id = id;
   //   this.nome = nome;
   //   this.email = email;
   // }
   
   public id: number;
   public nome: string;    
   public aroma: string; 
   public categoria: string;
   public marca: string;
   public descricao: string 
   
   toString() {
     return this.id+''+this.nome+''+this.aroma+''+this.categoria+''+this.marca+''+this.descricao;
   }
 }