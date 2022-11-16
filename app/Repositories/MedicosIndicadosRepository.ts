import Database from '@ioc:Adonis/Lucid/Database'
import MedicosIndicadoDTO from 'App/DTO/MedicosIndicadosDTO'

export default class MedicosIndicadoRepository {
  public static async find(params: MedicosIndicadoDTO) {
    const result = await Database.query()
      .from('medicos_indicados')
      .where(params)
      .join('indicacao_especificas', 'indicacao_especificas.id', '=', 'medicos_indicados.id_indicacao')
      .select('medicos_indicados.*')
     
    return result
  }
}
