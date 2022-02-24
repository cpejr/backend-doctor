import Database from '@ioc:Adonis/Lucid/Database'
import FormulariosDTO from 'App/DTO/FormulariosDTO'

export default class FormulariosRepository {
  public static async find(params: FormulariosDTO) {
    const result = await Database.query().from('formularios').where(params)

    return result
  }
}
