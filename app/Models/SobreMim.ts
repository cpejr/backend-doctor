import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
export default class SobreMim extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model:SobreMim){
    model.id = uuid()
  }

  @column()
  public imagem_um: string

  @column()
  public titulo_um: string

  @column()
  public texto_um: string

  @column()
  public imagem_dois: string

  @column()
  public titulo_dois: string

  @column()
  public texto_dois: string

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
