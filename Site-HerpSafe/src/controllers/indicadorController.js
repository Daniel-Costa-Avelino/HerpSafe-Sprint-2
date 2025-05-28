var indicadorModel = require("../models/indicadorModel");

function buscarRecintosMonitorados(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;

    indicadorModel.buscarRecintosMonitorados(fkEmpresa).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
            console.log(resultado)
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os recintos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarSensoresAtivos(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;

    indicadorModel.buscarSensoresAtivos(fkEmpresa).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
            console.log(resultado)
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os recintos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarAlertas(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;

    indicadorModel.buscarAlertas(fkEmpresa).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
            console.log(resultado)
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os alertas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarRecintosMonitorados,
    buscarSensoresAtivos,
    buscarAlertas
}