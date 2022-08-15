import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Arquivo extends BaseModel {
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
