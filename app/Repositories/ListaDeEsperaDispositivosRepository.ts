import Database from '@ioc:Adonis/Lucid/Database'
import ListaDeEsperaDispositivosDTO from 'App/DTO/ListaDeEsperaDispositivosDTO'
export default class ReceitasRepository {
  public static async find(params: ListaDeEsperaDispositivosDTO) {
    const result = await Database.query().from('lista_de_espera_dispositivos').where(params)

    return result
  }
}