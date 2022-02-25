import Database from '@ioc:Adonis/Lucid/Database'
import UsuariosDTO from 'App/DTO/UsuariosDTO'

export default class UsuariosRepository {
  public static async find(params: UsuariosDTO) {
    const result = await Database.query().from('usuarios').where(params)

    return result
  }
}
