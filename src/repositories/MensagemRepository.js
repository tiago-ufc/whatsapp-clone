class MensagemRepository {
  constructor() {
    // Lista de usuários do sistema
    this.usuarios = [
      { id: 1, nome: "Carlos Eduardo" },
      { id: 2, nome: "Ana Paula" },
      { id: 3, nome: "Marcos Souza" },
      { id: 4, nome: "Fernanda Lima" },
    ];

    // Armazenamento em memória das mensagens
    // Cada mensagem guarda: id, deUsuarioId, paraUsuarioId, texto e timestamp
    this.mensagens = [
      {
        id: 1,
        deUsuarioId: 2,
        paraUsuarioId: 1,
        texto: "Olá Carlos! Tudo bem?",
        timestamp: 1,
      },
      {
        id: 2,
        deUsuarioId: 1,
        paraUsuarioId: 2,
        texto: "Oi Ana! Tudo ótimo por aqui, e com você?",
        timestamp: 2,
      },
      {
        id: 3,
        deUsuarioId: 3,
        paraUsuarioId: 1,
        texto: "Carlos, vamos marcar a reunião amanhã?",
        timestamp: 3,
      },
      {
        id: 4,
        deUsuarioId: 4,
        paraUsuarioId: 1,
        texto: "Carlos, o projeto foi entregue com sucesso!",
        timestamp: 4,
      },
      {
        id: 5,
        deUsuarioId: 3,
        paraUsuarioId: 2,
        texto: "Oi Ana, conseguiu falar com o Carlos?",
        timestamp: 5,
      },
    ];
  }

  getUsuarios() {
    return this.usuarios;
  }

  getMensagensEntre(usuario1Id, usuario2Id) {
    return this.mensagens.filter(
      (m) =>
        (m.deUsuarioId === usuario1Id && m.paraUsuarioId === usuario2Id) ||
        (m.deUsuarioId === usuario2Id && m.paraUsuarioId === usuario1Id)
    );
  }

  // Compatibilidade com o método original da especificação
  getMensagens(contatoId, usuarioLogadoId = 1) {
    return this.getMensagensEntre(usuarioLogadoId, contatoId);
  }

  adicionarMensagem(mensagem) {
    this.mensagens.push(mensagem);
    return mensagem;
  }
}

export default MensagemRepository;
