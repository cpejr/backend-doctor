import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class IndicacaoEspecifica extends BaseModel {
  public static table = 'indicacao_especificas'

  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: string

  @column()
  public texto: string

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
