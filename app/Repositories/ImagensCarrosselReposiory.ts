import Database from '@ioc:Adonis/Lucid/Database'
import ImagensCarrosselDTO from 'App/DTO/ImagensCarrossel'
export default class ImagensCarrosselRepository {
  public static async find(params: ImagensCarrosselDTO) {
    const result = await Database.query().from('imagem_carrossels').where(params)

    return result
  }
}