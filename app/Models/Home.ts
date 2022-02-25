import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Home extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public video: string

  @column()
  public titulo_um: string

  @column()
  public texto_um: string

  @column()
  public titulo_dois: string

  @column()
  public texto_dois: string

  @column()
  public titulo_tres: string

  @column()
  public texto_tres: string

  @column()
  public titulo_quatro: string

  @column()
  public texto_quatro: string

  @column()
  public imagem_quatro: string

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
