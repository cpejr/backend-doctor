import Database from '@ioc:Adonis/Lucid/Database'
import ReceitasDTO from 'App/DTO/ReceitasDTO'
export default class ReceitasRepository {
  public static async find(params: ReceitasDTO) {
    const result = await Database.query()
      .from('receitas')
      .where(params)
      .join('usuarios', 'usuarios.id', '=', 'receitas.id_usuario')
      .select('receitas.*')
      .select('usuarios.nome')

    return result
  }
}
