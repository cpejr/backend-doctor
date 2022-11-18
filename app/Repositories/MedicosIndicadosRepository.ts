import Database from '@ioc:Adonis/Lucid/Database'
import MedicosIndicadoDTO from 'App/DTO/MedicosIndicadosDTO'

export default class MedicosIndicadoRepository {
  public static async find(params: MedicosIndicadoDTO) {
    const result = await Database.query()
      .from('medicos_indicados')
      .where(params)
      .select('medicos_indicados.*')

    return result
  }
}
