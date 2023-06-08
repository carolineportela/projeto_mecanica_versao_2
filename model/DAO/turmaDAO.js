/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das TURMAS no Banco de Dados
 * Data: 05/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertTurma = async function (dadosTurma) {

    let sql = `insert into tbl_turma (
        nome,
        sigla,
        id_curso
    ) values (
        '${dadosTurma.nome}',
        '${dadosTurma.sigla}',
        ${dadosTurma.id_curso}
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

//////////////////////Deletes///////////////////////////
const deleteTurma = async function (id) {
    let sql = `delete from tbl_turma where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

///////////////////////Updates//////////////////////////
const updateTurma = async function (dadosTurma) {

    let sql = `update tbl_turma set
                    nome = '${dadosTurma.nome}',
                    sigla = '${dadosTurma.sigla}',
                    id_curso = '${dadosTurma.id_curso}'
                where id = ${dadosTurma.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false

}

///////////////////////Selects//////////////////////////
const selectAllTurmas = async function () {
    let sql = `select * from tbl_turma`

    let rsTurma = await prisma.$queryRawUnsafe(sql)

    if (rsTurma.length > 0)
        return rsTurma
    else
        return false
}


// Retorna o Turma filtrando pelo ID de Curso
const selectTurmaByIDCurso = async function (idCurso) {
    let idTurmaCurso = idCurso

    let sql = ` select 
                    tbl_turma.id, tbl_turma.nome as nome_turma,
                    tbl_turma.sigla          
                from tbl_turma where tbl_turma.id_curso = ${idTurmaCurso};`;

    let rsTurma = await prisma.$queryRawUnsafe(sql)

    if (rsTurma.length > 0) {
        return rsTurma
    } else {
        return false;
    }

    
}


const selectLastId = async function () {
    let sql = `select * from tbl_turma order by id desc limit 1;`

    let rsTurma = await prisma.$queryRawUnsafe(sql)

    if (rsTurma.length > 0)
        return rsTurma
    else
        return false
}

const selectTurmaByID = async function (id) {

    let sql = `select * from tbl_turma where id = ${id}`;

    let rsTurmaId = await prisma.$queryRawUnsafe(sql);

    if (rsTurmaId.length > 0) {
        return rsTurmaId;
    }
    else {
        return false;
    }
}

module.exports = {
    insertTurma,
    deleteTurma,
    updateTurma,
    selectAllTurmas,
    selectLastId,
    selectTurmaByID,
    selectTurmaByIDCurso
}