const categoriaModel = require('../models/categoriaModel');

const categoriaController = {
    criarCategoria: async (req, res) => {
        try {
            const { nome } = req.body;
            if (!nome) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'O campo nome é obrigatório!'
                });
            }
            const nomeMaiusculo = String(nome).toUpperCase();

            const novaCategoria = await categoriaModel.create({
                data: { nome: nomeMaiusculo }
            });

            return res.status(201).json({
                sucesso: true,
                mensagem: 'Categoria cadastrada com sucesso!',
                categoria: novaCategoria
            });
        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    },
    listarCategorias: async (req, res) => {
        try {
            const categorias = await categoriaModel.findMany();
            return res.json({
                sucesso: true,
                total: categorias.length,
                categorias
            });
        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    },
    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome } = req.body;

            const categoriaAtualizada = await categoriaModel.update({
                where: { id: Number(id) },
                data: { nome: String(nome).toUpperCase() }
            });

            return res.json({
                sucesso: true,
                mensagem: 'Categoria atualizada com sucesso!',
                categoria: categoriaAtualizada
            });
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Categoria não encontrada!'
                });
            }
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    },
    excluir: async (req, res) => {
        try {
            const { id } = req.params;

            await categoriaModel.delete({
                where: { id: Number(id) }
            });
            return res.json({
                sucesso: true,
                mensagem: 'Categoria excluída com sucesso!'
            });
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Categoria não encontrada!'
                });
            }
            if (error.code === 'P2003') {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Não é possível excluir: existem produtos nessa categoria!'
                });
            }
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }
};
module.exports = categoriaController;
