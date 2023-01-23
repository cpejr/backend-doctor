import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Usuario from './Usuario'

export default class TokenUsuario extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model:TokenUsuario){
    model.id = uuid()
  }

  @column()
  public id_usuario: string

  @column()
  public token_dispositivo: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Usuario, {
    localKey: 'id_usuario'
  })
  public user: BelongsTo<typeof Usuario>

}
