import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'

export default class Conversa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_remetente: number

  @column()
  public id_destinatario: number

  @belongsTo(() => Usuario, {
    localKey: 'id_remetente'
  })
  public id_usuario_remetente: BelongsTo<typeof Usuario>

  @belongsTo(() => Usuario, {
    localKey: 'id_destinatario'
  })
  public id_usuario_destinatario: BelongsTo<typeof Usuario>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime

}
