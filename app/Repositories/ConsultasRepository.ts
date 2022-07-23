import Database from '@ioc:Adonis/Lucid/Database'
import ConsultasDTO from 'App/DTO/ConsultasDTO'

export default class ConsultasRepository {
  public static async find(params: ConsultasDTO) {
    const result = await Database.query()
      .from('consultas')
      .where(params)
      .join('usuarios', 'usuarios.id', '=', 'consultas.id_usuario')
      .select('consultas.*')
      .select('usuarios.nome', "usuarios.telefone","usuarios.avatar_url", "usuarios.email", "usuarios.codigo")

    return result
  }
}
