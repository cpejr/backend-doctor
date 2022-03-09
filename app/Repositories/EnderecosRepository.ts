import Database from '@ioc:Adonis/Lucid/Database'
import EnderecosDTO from 'App/DTO/EnderecosDTO'
export default class EnderecosRepository {
  public static async find(params: EnderecosDTO) {
    const result = await Database.query().from('enderecos').where(params)

    return result
  }
}
