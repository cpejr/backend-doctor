import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Arquivo extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID(model: Arquivo) {
    if (!model.$dirty.id) {
      model.id = uuid()
    }
  }

  @column()
  public nome: string

  @column()
  public chave: string

  @column()
  public url: string | null

  @column()
  public tipo_conteudo: string

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
