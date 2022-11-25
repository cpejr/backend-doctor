import Database from '@ioc:Adonis/Lucid/Database'
import EdicaoSobreMimDTO from 'App/DTO/EdicaoSobreMimDTO'
export default class EdicaoSobreMimRepository {
  public static async find(params: EdicaoSobreMimDTO): Promise<EdicaoSobreMimDTO[]> {
    const result = await Database.query().from('edicao_sobre_mims').where(params)

    return result
  }
}
