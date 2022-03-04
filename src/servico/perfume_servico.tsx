import { Perfume } from '../modelo/perfume'
import {Conexao} from '../bancodedados/conexao'

const table = "perfume"
const db=Conexao.getConnection()

export default class PerfumeServico {
     static addData(param: Perfume) {
        return new Promise((resolve, reject) =>db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (nome,aroma,categoria,marca,descricao) 
                values (?,?,?,?,?)`, 
                [param.nome, param.aroma, param.categoria, param.marca, param.descricao], 
                (_, { insertId, rows }) => {
                    console.log("id insert: " + insertId);
                    resolve(insertId)
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

     static deleteById(id: number) {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rows }) => {
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            });
    }


     static updateByObjeto(param: Perfume) {
        return new Promise((resolve, reject) =>db.transaction(tx => {
                tx.executeSql(`update ${table} set nome = ? , aroma = ? , categoria = ?, marca = ?, descricao = ?  where id = ?;`, [param.nome,param.aroma,param.categoria, param.marca, param.descricao, param.id], () => {
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            }));
    }

     static findById(id: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);

        }));
    }

      static findAll() {        
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }))


    }


}
