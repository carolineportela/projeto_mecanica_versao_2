/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos ALUNOS no Banco de Dados
 * Data: 04/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertAluno = async function (dadosAluno) {
    let sql = `insert into tbl_aluno (
        nome,
        data_nascimento,
        email
    ) values (
        '${dadosAluno.nome}',
        '${dadosAluno.data_nascimento}',
        '${dadosAluno.email}'
    )`

    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql);
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const deleteAluno = async function (id) {
   
    let idAluno = id;

    //Script para deletar o aluno
    let sql = `delete from tbl_aluno where id = ${idAluno}`

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const updateAluno = async function (dadosAluno) {
    let sql = `update tbl_aluno set
                    nome = '${dadosAluno.nome}',
                    data_nascimento = '${dadosAluno.data_nascimento}',
                    email = '${dadosAluno.email}'

                    where id = ${dadosAluno.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const selectAllAlunos = async function () {
    
    //SriptSQL para buscar todos os itens no banco de dados
    let sql = 'select * from tbl_aluno';

    let rsAluno = await prisma.$queryRawUnsafe(sql);

    //Valida se o banco de dados retornou algum regisro
    if (rsAluno.length > 0) {
        return rsAluno;
    }
    else {
        return false;
    }
}

const selectAlunoByID = async function (id) {
    let idAluno = id

    let sql = `select * from tbl_aluno where id = ${idAluno}`;

    let rsAlunoId = await prisma.$queryRawUnsafe(sql);

    if (rsAlunoId.length > 0) {
        return rsAlunoId;
    }
    else {
        return false;
    }
}

const selectByNameAluno = async function (name) {

    let nameAluno = name

    //Script para buscar um aluno filtrando pelo nome
    let sql = `select * from tbl_aluno where nome like '%${nameAluno}%'`;

    let rsAluno = await prisma.$queryRawUnsafe(sql)
    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

const selectLastId = async function () {
    let sql = `select * from tbl_aluno order by id desc limit 1;`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

module.exports = {
    insertAluno,
    deleteAluno,
    updateAluno,
    selectAllAlunos,
    selectAlunoByID,
    selectLastId,
    selectByNameAluno
}