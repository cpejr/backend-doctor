import Database from '@ioc:Adonis/Lucid/Database'
import ConsultasDTO from 'App/DTO/ConsultasDTO'

export default class ConsultasRepository {
  public static async find(params: ConsultasDTO) {
    const result = await Database.query().from('consultas').where(params)

    return result
  }
}
