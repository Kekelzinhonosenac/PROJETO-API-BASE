const produtoModel = require('../models/produtoModel');

const produtoController = {
    criarProduto: (req, res) => {
        const {codigo, nome, preco, qtde} = req.body;
        //validação simples dos campos obrigatórios
        if(!codigo || !nome || !preco || !qtde){
            return res.status(400).json({message: 'Todos os campos são obrigatórios'});
        }

        //transformar e calcular os dados do produto
        const nomeMaiosculo = String(nome).toUpperCase();
        const quantidade = Number(qtde);
        const valorTotal = Number(preco) * quantidade;
        const valorPreco = Number(preco);

        const novoProduto = {
            codigo,
            nome: nomeMaiosculo,
            preco: valorPreco,
            qtde: quantidade,
            total: valorTotal,
            criadoEm: new Date().toISOString()
        };
        //chama a função para persirtit o arquivo JSON
        const produtoSalvo = produtoModel.salvar(novoProduto);
        //retorna a resposta HTTP(201) com o produto salvo
        return res.status(201).json({
            sucesso: true,
            message: 'Produto criado com sucesso', 
            produto: produtoSalvo});
    },
    listarProdutos: (req, res) => {
        const produtos = produtoModel.buscarTodos();
        return res.status(200).json({
            sucesso: true,
            message: 'Produtos listados com sucesso',
            total: produtos.length,
            produtos: produtos
        });
    },
    listarProdutoPorCodigo: (req, res) => {
    const { id } = req.params;
    const produto = produtoModel.buscarPorCodigo(id);

    if (!produto) {
        return res.status(404).json({
            sucesso: false,
            message: 'Produto não encontrado'
        });
    }

    return res.status(200).json({
        sucesso: true,
        message: 'Produto encontrado com sucesso',
        produto: produto
    });
}


}
module.exports = produtoController;