import Database from '@ioc:Adonis/Lucid/Database'
import ConversasDTO from 'App/DTO/ConversasDTO'

export default class ConversasRepository {
  public static async find(params: ConversasDTO) {
    const result = await Database.query().from('conversas').where(params)

    return result
  }
}
