import Database from '@ioc:Adonis/Lucid/Database'
import IndicacoesEspecificasDTO from 'App/DTO/IndicacoesEspecificasDTO'
export default class IndicacoesEspecificasRepository {
  public static async find(params: IndicacoesEspecificasDTO) {
    const result = await Database.query().from('indicacao_especificas').where(params)

    return result
  }
}
