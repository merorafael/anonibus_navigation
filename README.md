Anonibus Application
====================

**ATENÇÃO!** Este aplicativo é uma demonstração para AV2 da matéria "Desenvolvimento de Aplicações Móveis" da UniCarioca. Os padrões de codificação podém não seguir as melhores praticas.

### Mudanças comparado com o projeto base
- Firebase removido, utilizando backend em Express+MongoDB(projeto anonibus-backend);
- Autenticação real por token JWT;
- Incluído campo "Nome" e "Confirmar Senha" no formulário de criação de conta;
- Validando dados na criação de conta(campos obrigatórios, senha com minimo de 6 digitos)
- Avatar incluído no profile
- Profile exibindo campos "Nome" e "E-mail", além do avatar;
- Upload de avatar por base64(embora que para arquivos estáticos o indicado seja não armazenar no banco de dados)
- Compressão da imagem de avatar após escolher a imagem

### Evoluções que não deram tempo de fazer
- Remover firebase do chat
- Implementar troca de mensagem por websocket no chat

