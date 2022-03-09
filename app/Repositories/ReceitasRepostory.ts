import Database from '@ioc:Adonis/Lucid/Database'
import ReceitasDTO from 'App/DTO/ReceitasDTO'
export default class ReceitasRepository {
  public static async find(params: ReceitasDTO) {
    const result = await Database.query().from('receitas').where(params)

    return result
  }
}