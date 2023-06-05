/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de TIPO_USUARIO  
 * (GET, POST, PUT, DELETE)
 * Data: 25/05/2023
 * Autor: Mateus Alves da Silva
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var message = require('./modulo/config.js')

var tipoUsuarioDAO = require('../model/DAO/tipoUsuarioDAO.js')
const {request} = require('express')

const inserirTipoUsuario = async function(dadosTipoUsuario) {
    if(dadosTipoUsuario.tipo == undefined || dadosTipoUsuario.tipo == '') {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let resultDados = await tipoUsuarioDAO.insertTipoUsuario(dadosTipoUsuario)

        if(resultDados) {
            let novoTipo = await tipoUsuarioDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.tipo = novoTipo

            return dadosJSON
        } else{
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const getTipoUsuario = async function() {
    let dadosTipoJSON = {}

    let dadosTipo = await tipoUsuarioDAO.selectAllTipos()

    if(dadosTipo) {
        dadosTipoJSON.status = message.SUCESS_REQUEST.status
        dadosTipoJSON.message = message.SUCESS_REQUEST.message
        dadosTipoJSON.quantidade = dadosTipo.length;
        dadosTipoJSON.tipos = dadosTipo
        return dadosTipoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

module.exports = {
    inserirTipoUsuario,
    getTipoUsuario
}