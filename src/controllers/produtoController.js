const produtoModel = require('../models/produtoModel');

const produtoController = {
    criarProduto: async (req, res) =>{   
        try { 
            const { codigo, nome, quantidade, preco, categoriaId} = req.body;
            // Validação simples dos campos obrigatórios
            if(!codigo || !nome || !quantidade || !preco){
                return res.status(400).json({
                    sucesso:false,
                    mensagem: "Todos os campos (codigo, nome, qtde, preco) são obrigatórios!"
                })
            }
            //Transformar e calcular os dados
            const codigoNumero = Number(codigo);
            const nomeMaiusculo = String(nome).toUpperCase();
            const qtde = Number(quantidade);
            const valorPreco = Number(preco);
            const valorTotal = qtde * valorPreco;
            const categoriaIdNumero = Number(categoriaId);

            const novoProduto = await produtoModel.create({
                data: { //json
                codigo: codigoNumero,
                nome: nomeMaiusculo,
                quantidade: qtde,
                preco: valorPreco,
                total: valorTotal,
                categoriaId: categoriaIdNumero
                }
            });

            // Retorna a resposta HTTP 201 (Criado)
            return res.status(201).json({
                sucesso:true,
                mensagem: "Produto cadastrado com sucesso no MySQL!",
                produto: novoProduto            
            })
        }catch (error){
            if(error.code === 'P2003'){
                return res.status(400).json({
                    sucesso:false,
                    mensagem:'O Codigo da Categoria informada não existe!'
                })
            }
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    },
    listarProdutos: async (req, res) =>{
        try {
            const produtos = await produtoModel.findMany();
            return res.json({
                sucesso: true,
                total: produtos.length,
                produtos      
            })
        } catch (error) {
            return res.status(500).json({sucesso: false, erro: error.message})
        }

    },
    listarProdutoPorCodigo: async (req, res) =>{
        try {
            const { codigo } = req.params;

            const produto = await produtoModel.findUnique({
                where: {codigo: Number(codigo)}
            })
            if(!produto){
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Produto não encontrado!'
                });
            }
            return res.json({
                sucesso: true,
                produto
            })
        } catch (error) {
            return res.status(500).json({sucesso: false, erro: error.message})
        }
    },
    atualizar: async (req, res) => {
        try {
            const { codigo } = req.params;

            const { nome, quantidade, preco, categoriaId } = req.body;

            const produtoAtual = await produtoModel.findUnique({
                where: {codigo: Number(codigo)}
            })
            if(!produtoAtual){
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Produto não encontrado!'
                });
            }
            const qtdeFinal = quantidade !== undefined ? Number(quantidade): produtoAtual.quantidade;
            const precoFinal = preco !== undefined ? Number(preco): produtoAtual.preco;
            const categoriaFinal = categoriaId !== undefined ? Number(categoriaId): produtoAtual.categoriaId;
            const totalFinal = Number((qtdeFinal * precoFinal).toFixed(2));

            const produtoAtualizado = await produtoModel.update({
                where: {codigo:Number(codigo)},
                data:{
                    nome: nome ? String(nome).toUpperCase() : produtoAtual.nome,
                    quantidade: qtdeFinal,
                    preco: precoFinal,
                    total: totalFinal,
                    categoriaId: categoriaFinal
                }
            })

            return res.json({
                sucesso: true,
                mensagem:'Produto atualizado com sucesso!',
                produto: produtoAtualizado
            })

        } catch (error) {
            if(error.code === 'P2003'){
                return res.status(400).json({
                    sucesso:false,
                    mensagem:'O Codigo da Categoria informada não existe!'
                })
            }
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    },
    excluir: async (req, res) => {
        try {
            const { codigo } = req.params;
            
            await produtoModel.delete({
                where: {codigo: Number(codigo)}
            })
            return res.json({
                sucesso: true,
                mensagem:'Produto excluido com sucesso!'
            });

        } catch (error) {
            if (error.code ==='P2025'){
                return res.status(404).json({
                    sucesso:false,
                    mensagem:'Produto não encontrado!'
                })
            }    
            return res.status(500).json({
                sucesso:false,
                erro: error.message
            })
        }
    }

}
module.exports = produtoController;