import Database from '@ioc:Adonis/Lucid/Database'
import IndicacaosDTO from 'App/DTO/IndicacaosDTO'

export default class IndicacaosRepository {
  public static async find(params: IndicacaosDTO) {
    const result = await Database.query().from('indicacaos').where(params)

    return result
  }
}
