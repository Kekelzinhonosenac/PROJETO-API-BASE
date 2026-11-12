
const usuarios = [];

const usuarioController = {
    criarUsuario: (req, res) => {
        const { nome, sobrenome, email, celular } = req.body;

        // Validação simples dos campos obrigatórios
        if (!nome || !sobrenome || !email || !celular) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const novoUsuario = {
            nome,
            sobrenome,
            email,
            celular,
            criadoEm: new Date().toISOString()
        };

        usuarios.push(novoUsuario);

        return res.status(201).json({
            sucesso: true,
            message: 'Usuário criado com sucesso',
            usuario: novoUsuario
        });
    },

    listarUsuarios: (req, res) => {
        return res.status(200).json({
            sucesso: true,
            message: 'Usuários listados com sucesso',
            total: usuarios.length,
            usuarios: usuarios
        });
    }
};

module.exports = usuarioController;
