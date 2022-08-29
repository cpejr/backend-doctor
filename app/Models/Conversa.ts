import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Mensagem from './Mensagem'
import { v4 as uuid } from 'uuid'
export default class Conversa extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model:Conversa){
    model.id = uuid()
  }

  @column()
  public id_usuario1: string

  @column()
  public id_usuario2: string

  @belongsTo(() => Usuario, {
    localKey: 'id_usuario1'
  })
  public id_usuario_1: BelongsTo<typeof Usuario>

  @belongsTo(() => Usuario, {
    localKey: 'id_usuario2'
  })
  public id_usuario_2: BelongsTo<typeof Usuario>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime

  @hasMany(() => Mensagem, {
    foreignKey: 'id_conversa'
  })
  public mensagem: HasMany<typeof Mensagem>
}
