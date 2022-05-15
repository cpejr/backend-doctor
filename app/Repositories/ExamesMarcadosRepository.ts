import Database from '@ioc:Adonis/Lucid/Database'
import ExamesMarcadosDTO from 'App/DTO/ExamesMarcadosDTO'
export default class ExamesMarcadosRepository {
  public static async find(params: ExamesMarcadosDTO) {
    const result = await Database.query()
      .from('exame_marcados')
      .where(params)
      .join('exames', 'exames.id', '=', 'exame_marcados.id_exame')
      .select("exame_marcados.*")
      .select("exames.titulo")
      .join('usuarios', 'usuarios.id', '=', 'exame_marcados.id_usuario')
      .select("usuarios.nome", "usuarios.telefone")

    return result
  }
}
