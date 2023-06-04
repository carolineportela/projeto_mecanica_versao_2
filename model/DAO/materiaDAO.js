/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das MATERIAS no Banco de Dados
 * Data: 19/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertMateria = async function(dadosMateria) {
    let sql = `insert into tbl_materia (
        nome,
        sigla
    ) values (
        '${dadosMateria.nome}',
        '${dadosMateria.sigla}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

//////////////////////Deletes///////////////////////////
const deleteMateria = async  function(id) {
    let sql = `delete from tbl_materia where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

///////////////////////Updates//////////////////////////
const updateMateria = async function(dadosMateria) {
     let sql = `update tbl_materia set
                    nome = '${dadosMateria.nome}',
                    sigla = '${dadosMateria.sigla}'
                where id = ${dadosMateria.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)
    
    if(resultStatus)
        return true
    else
        return false
}

///////////////////////Selects//////////////////////////
const selectAllMaterias = async function() {
    let sql = `select * from tbl_materia`
    
    let rsMateria = await prisma.$queryRawUnsafe(sql)

    if(rsMateria.length > 0)
        return rsMateria
    else
        return false
}

const selectLastId = async function () {
    let sql = `select * from tbl_materia order by id desc limit 1;`

    let rsMateria = await prisma.$queryRawUnsafe(sql)

    if (rsMateria.length > 0)
        return rsMateria
    else
        return false
}

const selectMateriaByID = async function (id) {
    let idMateria = id

    let sql = `select * from tbl_materia where id = ${idMateria}`;

    let rsMateriaId = await prisma.$queryRawUnsafe(sql);

    if (rsMateriaId.length > 0) {
        return rsMateriaId;
    }
    else {
        return false;
    }
}

module.exports = {
    insertMateria,
    updateMateria,
    deleteMateria,
    selectAllMaterias,
    selectLastId,
    selectMateriaByID
}