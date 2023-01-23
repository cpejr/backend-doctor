import Database from '@ioc:Adonis/Lucid/Database'
import TokenUsuariosDTO from 'App/DTO/TokenUsuariosDTO'

export default class TokenUsuariosRepository {
  public static async find(params: TokenUsuariosDTO) {
    const result = await Database.query().from('token_usuarios').where(params)

    return result
  }
}