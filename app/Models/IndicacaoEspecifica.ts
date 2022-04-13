import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
export default class IndicacaoEspecifica extends BaseModel {
  public static table = 'indicacao_especificas'

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model:IndicacaoEspecifica){
    model.id = uuid()
  }

  @column()
  public titulo: string

  @column()
  public texto: string

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
