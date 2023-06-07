/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de Margem de erros
 * (GET, POST, PUT, DELETE)
 * Data: 06/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var margemErroDAO = require('../model/DAO/margem_erroDAO.js')

const { request } = require('express')

const inserirMargemErro = async function (dadosMargemObtido) {

    if (dadosMargemObtido.valor_minimo == '' || dadosMargemObtido.valor_minimo == undefined ||
        dadosMargemObtido.valor_maximo == '' || dadosMargemObtido.valor_maximo == undefined ||
        dadosMargemObtido.id_criterio == '' || dadosMargemObtido.id_criterio == undefined) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultDadosMargemErro = await margemErroDAO.insertMargemErro(dadosMargemObtido)

        if (resultDadosMargemErro) {
            let novaMargemErro = await margemErroDAO.selectLastId()

            let dadosMargemErroJSON = {}
            dadosMargemErroJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosMargemErroJSON.margens_erro = novaMargemErro

            return dadosMargemErroJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

module.exports = {
    inserirMargemErro
}