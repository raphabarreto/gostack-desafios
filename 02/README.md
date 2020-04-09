<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="../.github/logo.png" width="300px" />
</h1>

<h3 align="center">Desafio 2: FastFeet, o início</h3>

<p align="center">Nesse projeto foi desenvolvido uma aplicação Back-end para uma transportadora fictícia, o FastFeet </a>.</p>


# 🚀 Tecnologias

- ⚡ [JavaScript](https://skylab.rocketseat.com.br/journey/starter)

- ⚡ [Node](https://nodejs.org/en/)
- ⚡ [Sequelize](https://sequelize.org/)

# 🔥 Instalação
1. Faça o clone do projeto `git clone git@github.com:raphabarreto/gostack-desafios.git`

# 💻 Execução
1. Entre na pasta `02`;

2. Execute `yarn install` para instalar todas as dependências;
3. Crie os seguintes contâiners no docker:
 ```
 docker run --name database -e POSTGRES_PASSWORD=[DB_PASS] -p 5432:5432 -d [DB_USER]
 ```
 ```
 docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine
 ```
* `Lembrando que é necessário renomear o arquivo .env.example para .env e assim colocar as suas devidas variáveis de acordo com seu ambiente;`
4. Execute as migrations com `yarn sequelize db:migrate`;

5. Execute as seeds com `yarn sequelize db:seed:all`;
6. Clique neste botão [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Fastfeet&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fraphabarreto%2Fgostack-desafios%2Fmaster%2F03%2FFastFeet.json) para que seja importado todo o workspace no seu Insomnia ou navegue até **[aqui](https://raw.githubusercontent.com/raphabarreto/gostack-desafios/master/03/FastFeet.json)** para acessar o arquivo JSON para consumo da API.
7. E por último execute os comandos `yarn dev` e logo após `yarn queue`;

# 🔨 Resultado
<h1 align="center">
<img src="../.github/backend.png" alt="Backend">
<a href="https://insomnia.rest/run/?label=Fastfeet&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fraphabarreto%2Ffastfeet%2Fmaster%2Fbackend%2FFastFeet.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</h1>

## 🧾 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com 💖 por [Raphael Barreto](https://www.linkedin.com/in/raphael-barreto-15631747/)
graças a [Rocketseat](https://rocketseat.com.br/)🚀
