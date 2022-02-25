import Database from '@ioc:Adonis/Lucid/Database'
import SobreMimsDTO from 'App/DTO/SobreMimsDTO'

export default class SobreMimsRepository {
  public static async find(params: SobreMimsDTO) {
    const result = await Database.query().from('sobre_mims').where(params)

    return result
  }
}
