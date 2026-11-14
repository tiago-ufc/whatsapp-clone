import MensagemRepository from "../repositories/MensagemRepository";

class MensagemService {
  constructor() {
    this.repository = new MensagemRepository();
    this.usuarioLogadoId = 1;
  }

  getUsuarios() {
    return this.repository.getUsuarios();
  }

  getUsuarioLogado() {
    const usuarios = this.repository.getUsuarios();
    return (
      usuarios.find((u) => u.id === this.usuarioLogadoId) || usuarios[0]
    );
  }

  setUsuarioLogado(id) {
    this.usuarioLogadoId = id;
  }

  getContatosComUltimaMensagem(usuarioLogadoId = this.usuarioLogadoId) {
    const todos = this.repository.getUsuarios();
    const contatos = todos.filter((u) => u.id !== usuarioLogadoId);

    return contatos.map((contato) => {
      const msgs = this.repository.getMensagensEntre(
        usuarioLogadoId,
        contato.id
      );
      const ultimaMsg = msgs.length > 0 ? msgs[msgs.length - 1].texto : "";
      return {
        ...contato,
        ultimaMensagem: ultimaMsg,
      };
    });
  }

  getMensagens(contatoId, usuarioLogadoId = this.usuarioLogadoId) {
    const rawMensagens = this.repository.getMensagensEntre(
      usuarioLogadoId,
      contatoId
    );

    return rawMensagens.map((msg) => ({
      id: msg.id,
      contatoId: contatoId,
      texto: msg.texto,
      recebida: msg.deUsuarioId !== usuarioLogadoId,
    }));
  }

  enviarMensagem(contatoId, texto, usuarioLogadoId = this.usuarioLogadoId) {
    if (!texto || texto.trim().length === 0) {
      return null;
    }

    const novaMensagem = {
      id: Date.now(),
      deUsuarioId: usuarioLogadoId,
      paraUsuarioId: contatoId,
      texto: texto.trim(),
      timestamp: Date.now(),
    };

    this.repository.adicionarMensagem(novaMensagem);

    return {
      id: novaMensagem.id,
      contatoId: contatoId,
      texto: novaMensagem.texto,
      recebida: false,
    };
  }
}

const mensagemService = new MensagemService();
export default mensagemService;
