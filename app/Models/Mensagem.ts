import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Conversa from './Conversa'

export default class Mensagem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public mensagem: string

  @column()
  public data_envio: DateTime

  @column()
  public media_url: string

  @column()
  public foi_enviado: boolean

  @column()
  public foi_visualizado: boolean

  @column()
  public id_conversa: number

  @belongsTo(() => Conversa, {
    localKey: 'id_conversa'
  })
  public conversa: BelongsTo<typeof Conversa>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
