/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos USUARIOS no Banco de Dados
 * Data: 22/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertUsuario = async function(dadosUsuario) {
    let sql = `insert into tbl_usuario (
        email,
        senha,
        id_tipo_usuario
    ) values (
        '${dadosUsuario.email}',
        '${dadosUsuario.senha}',
        ${dadosUsuario.id_tipo_usuario}
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

//////////////////////Deletes///////////////////////////
const deleteUsuario = async function(id) {
    let sql = `delete from tbl_usuario where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

///////////////////////Updates//////////////////////////
const updateUsuario = async function(dadosUsuario) {
    let sql = `update tbl_usuario set
                    email = '${dadosUsuario.email}',
                    senha = '${dadosUsuario.senha}',
                    id_tipo_usuario = '${id_tipo_usuario}'
                where id = ${dadosUsuario.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)
    
    if(resultStatus)
        return true
    else
        return false
}

///////////////////////Selects//////////////////////////
const selectUsuarioByID = async function(id) {
    let sql = `select * from tbl_usuario where id = ${id}`
    
    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if(rsUsuario.length > 0)
        return rsUsuario
    else
        return false
}

const selectUsuarioByEmail = async function(email) {
    let sql = `select * from tbl_usuario where email like '%${email}%'`

    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if(rsUsuario.length > 0)
        return rsUsuario
    else
        return false
}

const selectUsuarioByType = async function(tipoUsuario) {
    let sql =  `select * from tbl_usuario where id_tipo_usuario like '%${tipoUsuario}%'`

    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if(rsUsuario.length > 0)
        return rsUsuario
    else
        return false
}
const selectLastId = async function() {
    let sql = `select * from tbl_usuario order by id desc limit 1;`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if(rsAluno.length > 0)
        return rsAluno
    else
        return false
}

///////////////////////Selects//////////////////////////
const selectAllUsuarios = async function() {
    let sql = `select * from tbl_usuario`
    
    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if (rsUsuario.length > 0) {
        return rsUsuario;
    }
    else {
        return false;
    }
}


module.exports = {
  insertUsuario,
  deleteUsuario,
  updateUsuario,
  selectUsuarioByID,
  selectUsuarioByEmail,
  selectUsuarioByType,
  selectLastId,
  selectAllUsuarios
}