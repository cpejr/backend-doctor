import Database from '@ioc:Adonis/Lucid/Database'
import SobreMimDTO from 'App/DTO/SobreMimsDTO'
export default class SobreMimRepository {
  public static async find(params: SobreMimDTO): Promise<SobreMimDTO[]> {
    const result = await Database.query().from('sobre_mims').where(params)

    return result
  }
}
