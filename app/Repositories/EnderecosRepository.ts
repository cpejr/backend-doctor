import Database from '@ioc:Adonis/Lucid/Database'
import EnderecosDTO from 'App/DTO/EnderecosDTO'

export default class EnderecosRepository {
  public static async find(params: EnderecosDTO) {
    const chaves = Object.keys(params)
    let parametrosValidos = []
    chaves.forEach((chave) => {
      if (params[chave]) {
        parametrosValidos[chave] = params[chave]
      }
      
    })
    const result = await Database.query().from('enderecos').where(parametrosValidos)
    return result
  }
}
