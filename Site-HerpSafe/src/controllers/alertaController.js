var alertaModel = require("../models/alertaModel");

function buscarAlertas(req, res) {
    var idEmpresa = req.body.fkEmpresaServer;

    alertaModel.buscarAlertas(idEmpresa).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os recintos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarAlertas
}