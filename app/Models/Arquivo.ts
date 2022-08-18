import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Arquivo extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Arquivo) {
    if (!model.$dirty.id) {
      model.id = uuid()
    }
  }
  @column({ isPrimary: true })
  public id: string

  @column({ isPrimary: true })
  public nome: string

  @column({ isPrimary: true })
  public chave: string

  @column({ isPrimary: true })
  public url: void

  @column({ isPrimary: true })
  public tipo_conteudo: string

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
