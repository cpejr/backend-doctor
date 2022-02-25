import Database from '@ioc:Adonis/Lucid/Database'
import HomesDTO from 'App/DTO/HomesDTO'

export default class HomesRepository {
  public static async find(params: HomesDTO) {
    const result = await Database.query().from('homes').where(params)

    return result
  }
}
