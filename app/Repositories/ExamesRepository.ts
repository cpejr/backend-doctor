import Database from '@ioc:Adonis/Lucid/Database'
import ExamesDTO from 'App/DTO/ExamesDTO'

export default class ExamesRepository {
  public static async find(params: ExamesDTO) {
    const result = await Database.query().from('exames').where(params)

    return result
  }
}
