import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'

export default class TokenUsuario extends BaseModel {
  @column({ isPrimary: true })
  public token_dispositivo: string

  @column()
  public id_usuario: string

  @belongsTo(() => Usuario, {
    localKey: 'id_usuario'
  })
  public usuario: BelongsTo<typeof Usuario>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime



}
