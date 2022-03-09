import Database from '@ioc:Adonis/Lucid/Database'
import AssinaturasDTO from 'App/DTO/AssinaturasDTO'

export default class AssinaturasRepository {
  public static async find(params: AssinaturasDTO) {
    const result = await Database.query().from('assinaturas').where(params)

    return result
  }
}
