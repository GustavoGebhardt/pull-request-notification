# Pull Request Notification

Este projeto foi desenvolvido para atender a uma necessidade de verificação de Pull Requests em repositórios do GitHub. Utiliza a API REST do GitHub para obter todas as PRs abertas e realiza quatro validações: se há alguma solicitação de alteração no código, se nenhum revisor foi selecionado, se os revisores ainda não revisaram a PR e se apenas um dos dois revisores revisou a PR enquanto o outro não. Se a PR se enquadrar em algum desses casos, uma mensagem informando a situação da PR é enviada via Webhook do Discord.

## Sumário

- [Instalação](#instalação)
- [Utilização](#utilização)
- [Licença](./LICENSE)

## Instalação

### Clone o repositório

```bash
git clone https://github.com/GustavoGebhardt/pull-request-notification
cd pull-request-notification
```

### Instale as dependência

```bash
npm i
```

### Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente com os valores apropriados:

```bash
nano .env
```

Exemplo de conteúdo do .env:

```bash
WEBHOOK_DISCORD=https://discord.com/api/webhooks/12345/abcd
GITHUB_USER=SeuNomeDeUsuario
GITHUB_REPO=NomeDoSeuRepositorio
GITHUB_TOKEN=token-github
EXECUTION_INTERVAL=1
```

### Webhook Discord

Você pode criar um Webhook do Discord seguindo a própria [documentação](https://support.discord.com/hc/pt-br/articles/228383668-Usando-Webhooks) fornecida por eles.

Em seguida informe a Webhook URl na variável de ambiente "WEBHOOK_DISCORD".

## Utilização

Build do código.

```bash
npm run build
```

Executar o código.

```bash
npm run start
```