import Database from '@ioc:Adonis/Lucid/Database'
import ApiTokenDTO from 'App/DTO/ApiTokenDTO'

export default class ApiTokenRepository {
  public static async find(params: ApiTokenDTO) {
    const result = await Database.query().from('api_tokens').where(params)

    return result
  }
}
