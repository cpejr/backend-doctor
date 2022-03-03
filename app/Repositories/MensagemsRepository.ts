import Database from '@ioc:Adonis/Lucid/Database'
import MensagemsDTO from 'App/DTO/MensagemsDTO'

export default class MensagemsRepository {
  public static async find(params: MensagemsDTO) {
    const result = await Database.query().from('mensagems').where(params)

    return result
  }
}
