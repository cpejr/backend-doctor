import Database from '@ioc:Adonis/Lucid/Database'
import ComentariosDTO from 'App/DTO/ComentariosDTO'

export default class ComentariosRepository {
  public static async find(params: ComentariosDTO) {
    const result = await Database.query().from('comentarios').where(params)

    return result
  }
}
