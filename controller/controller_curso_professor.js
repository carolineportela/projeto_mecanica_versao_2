/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de curso_professor
 * (GET, POST, PUT, DELETE)
 * Data: 10/06/2023
 * Autor: Caroline Portela 
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var message = require('./modulo/config.js')

var cursoProfessorDAO = require('../model/DAO/MUDAR PRA NOVA TABELA CURSO_TURMA_PROFESSOR.js')
const { request } = require('express')

const inserirCursoProfessor = async function (dadosCursoProfessor) {
    if (
        dadosCursoProfessor.id_curso == undefined || dadosCursoProfessor.id_curso == '' || isNaN(dadosCursoProfessor.id_curso) ||
        dadosCursoProfessor.id_professor == undefined || dadosCursoProfessor.id_professor == '' || isNaN(dadosCursoProfessor.id_professor)

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let resultDados = await cursoProfessorDAO.insertCursoProfessor(dadosCursoProfessor)

        if (resultDados) {
            let novoCursoDoProfessor = await cursoProfessorDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.cursosDoProfessor = novoCursoDoProfessor

            return dadosJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}


const atualizarCursoProfessor = async function (dadosCursoProfessor, idCursoProfessor) {
    if (
        dadosCursoProfessor.id_curso == undefined || dadosCursoProfessor.id_curso == '' || isNaN(dadosCursoProfessor.id_curso) ||
        dadosCursoProfessor.id_professor == undefined || dadosCursoProfessor.id_professor == '' || isNaN(dadosCursoProfessor.id_professor)

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idCursoProfessor == '' || idCursoProfessor == undefined || idCursoProfessor == isNaN(idCursoProfessor)) {
        return message.ERROR_INVALID_ID
    } else {

        dadosCursoProfessor.id = idCursoProfessor;

        let statusId = await cursoProfessorDAO.selectCursoProfessorByID(idCursoProfessor)

        if (statusId) {

            let resultDadosCursoProfessor = await cursoProfessorDAO.updateCursoProfessor(dadosCursoProfessor);

            if (resultDadosCursoProfessor) {

                let dadosJSON = {}

                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.cursosDoProfessor = dadosCursoProfessor
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}


const deletarCursoProfessor = async function (idCursoProfessor) { 
    let statusId = await cursoProfessorDAO.selectCursoProfessorByID(idCursoProfessor);

    if (statusId) {
        if (idCursoProfessor == '' || idCursoProfessor == undefined || isNaN(idCursoProfessor)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await cursoProfessorDAO.deleteCursoProfessor(idCursoProfessor)

            if (resultDados) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } else {
        return message.ERROR_NOT_FOUND
    }

}


const getCursoProfessor = async function () {
    let cursosProfessorJSON = {}

    let cursosProfessor = await cursoProfessorDAO.selectAllCursoProfessor()

    if (cursosProfessor) {

        cursosProfessorJSON.status = message.SUCESS_REQUEST.status
        cursosProfessorJSON.message = message.SUCESS_REQUEST.message
        cursosProfessorJSON.quantidade = cursosProfessor.length;
        cursosProfessorJSON.materia = cursosProfessor

        return cursosProfessorJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}


const getCursoProfessorID = async function (idCursoProfessor) {
    //Validacao do ID
    if (idCursoProfessor == '' || idCursoProfessor == undefined || isNaN(idCursoProfessor)) {
        return message.ERROR_INVALID_ID

    } else {

        let dadosCursoProfessorJSON = {};

        let dadosCursoProfessor = await cursoProfessorDAO.selectCursoProfessorByID(idCursoProfessor);

        if (dadosCursoProfessor) {

            dadosCursoProfessorJSON.status = message.SUCESS_REQUEST.status
            dadosCursoProfessorJSON.message = message.SUCESS_REQUEST.message
            dadosCursoProfessorJSON.cursosDoProfessor = dadosCursoProfessor
            return dadosCursoProfessorJSON
        } else {
            return message.ERROR_NOT_FOUND
        }

    }

}


module.exports = {
    inserirCursoProfessor,
    atualizarCursoProfessor,
    getCursoProfessor,
    getCursoProfessorID,
    deletarCursoProfessor
}