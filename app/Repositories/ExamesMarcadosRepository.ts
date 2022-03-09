import Database from '@ioc:Adonis/Lucid/Database'
import ExamesMarcadosDTO from 'App/DTO/ExamesMarcadosDTO'
export default class ExamesMarcadosRepository {
  public static async find(params: ExamesMarcadosDTO) {
    const result = await Database.query().from('exame_marcados').where(params)

    return result
  }
}
