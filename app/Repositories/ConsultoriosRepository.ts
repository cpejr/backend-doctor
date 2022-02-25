import Database from '@ioc:Adonis/Lucid/Database'
import ConsultoriosDTO from 'App/DTO/ConsultoriosDTO'

export default class ConsultoriosRepository {
  public static async find(params: ConsultoriosDTO) {
    const result = await Database.query().from('consultorios').where(params)

    return result
  }
}
