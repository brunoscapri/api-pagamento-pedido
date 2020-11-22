var valid = require("card-validator");
const ValidatorContract = require('../validators/fluent-validator')

exports.realizarPagamento = async (req, res) => {

    let valor = req.body.valor;
    let numeroCartao = req.body.numerocartao;
    let cvv = req.body.cvv;
    let titular = req.body.titular;
    let validade = req.body.validade;
    let contrato = new ValidatorContract();

    contrato.isRequired(cvv, "CVV inválido.");
    contrato.isRequired(valor, "Valor de pagamento inválido");
    contrato.isRequired(titular, `Nome do titular ${titular} inválido`);
    contrato.isRequired(validade, `Validade ${validade} incorreta.`);
    contrato.isValidDate(validade, "Cartao vencido.");


    var numberValidation = valid.number(numeroCartao);


    if (!numberValidation.isPotentiallyValid) {
        res.status(400).send({ erro: "Cartao de credito invalido" }).end();
        return;
    }

    if (!contrato.isValid()) {
        res.status(400).send(contrato.errors()).end();
        return;
    }



    try {
        res.status(200).send({
            titular: titular.toUpperCase(),
            tipo: "CREDITO",
            operadora: numberValidation.card.type.toUpperCase(),
            numerocartao: numeroCartao,
            validade: validade,
            valor: valor,

        });
    } catch (e) {
        res.status(500).send({
            message: "Erro ao processar requisição.",
            erro: e
        });
    }


}