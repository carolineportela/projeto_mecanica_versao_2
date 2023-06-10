/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados Cursos e Materias no Banco de Dados
 * Data: 10/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/


var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertCursoProfessor = async function (dadosCursoProfessor) {
    let sql = `insert into tbl_curso_professor (     
        id_professor,
        id_curso
    ) values (
        ${dadosCursoProfessor.id_professor},
        ${dadosCursoProfessor.id_curso}
    )`
    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}

const updateCursoProfessor = async function(dadosCursoProfessor) {
    let sql = `update tbl_curso_professor set
                    id_professor = ${dadosCursoProfessor.id_professor},
                    id_curso = ${dadosCursoProfessor.id_curso}
                where id = ${dadosCursoProfessor.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
      if (resultStatus) {
          return true;
      } else {
          return false;
      }
}

const deleteCursoProfessor = async function(id) {
    let idCursoProfessor = id;

    let sql = `delete from tbl_curso_professor where id = ${idCursoProfessor}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const selectCursoProfessorByID = async function(id) {
    let sql = `select * from tbl_curso_professor where id = ${id}`
    
    let rs = await prisma.$queryRawUnsafe(sql)

    if(rs.length > 0)
        return rs
    else
        return false
}



const selectAllCursoProfessor = async function () {
    let sql = `select * from tbl_curso_professor`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }

}

const selectLastId = async function() {
    let sql = `select * from tbl_curso_professor order by id desc limit 1;`

    let rs= await prisma.$queryRawUnsafe(sql)

    if(rs.length > 0)
        return rs
    else
        return false
}

module.exports = {
    insertCursoProfessor,
    updateCursoProfessor,
    deleteCursoProfessor,
    selectAllCursoProfessor,
    selectCursoProfessorByID,
    selectLastId
}