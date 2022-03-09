import Database from '@ioc:Adonis/Lucid/Database'
import DispositivosDTO from 'App/DTO/Dispositivos.DTO'

export default class DispositivosRepository {
  public static async find(params: DispositivosDTO) {
    const result = await Database.query().from('dispositivos').where(params)

    return result
  }
}
