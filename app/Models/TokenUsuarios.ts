import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Usuario from './Usuario'

export default class TokenUsuarios extends BaseModel {
  @column({ isPrimary: true })
  public id_usuario: string

  @beforeCreate()
  public static async createUUID (model:TokenUsuarios){
    model.id_usuario = uuid()
  }

  @column()
  public token_dispositivo: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Usuario, {
    foreignKey: 'id_usuario'
  })
  public subject: HasMany<typeof Usuario>
}
