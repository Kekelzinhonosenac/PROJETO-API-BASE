const usuarios = [];
const usuarioController = {
    // Rota POST para criar um novo usuário
    criarUsuario: (req, res) => {
        const { nome, sobrenome, email, celular } = req.body;
        // Validação simples dos campos obrigatórios
        if (!nome || !sobrenome || !email || !celular) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }
        // Cria um novo objeto de usuário com os dados inseridos.
        const novoUsuario = {
            nome,
            sobrenome,
            email,
            celular,
            criadoEm: new Date().toISOString()
        };
        // Adiciona o novo usuário à lista de usuários
        usuarios.push(novoUsuario);
        return res.status(201).json({
            sucesso: true,
            message: 'Usuário criado com sucesso',
            usuario: novoUsuario
        });
    },
// Rota GET para listar todos os usuários
    listarUsuarios: (req, res) => {
        return res.status(200).json({
            sucesso: true,
            message: 'Usuários listados com sucesso',
            total: usuarios.length,
            usuarios: usuarios
        });
    }
};
//nao esquecer dessa portariazinha aqui -> module.exports = usuarioController;
module.exports = usuarioController;