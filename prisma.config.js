// 1. Carrega as variáveis de ambiente do arquivo .env (DATABASE_URL)
require('dotenv').config();

// 2. Importa duas ferramentas internas do pacote Prisma:
const { defineConfig, env } = require('prisma/config');

// 3. Exporta o objeto de configuração que sera lido pelos comandos de terminal
// (como 'npx prisma migrate dev', 'npx prisma generate' e 'npx prisma studio').
module.exports = defineConfig({
  // 4. Indica onde está o arquivo (ou pasta) com o desenho das suas tabelas.
  schema: 'prisma/schema.prisma',

  // 5. Define a pasta onde o Prisma vai salvar o histórico de alterações SQL
  migrations: {
    path: 'prisma/migrations',
  },

  // 6. Configura a fonte de dados para os comandos de terminal, apontando a URL
  datasource: {
    url: env('DATABASE_URL'),
  },
});
