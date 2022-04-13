import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import { v4 as uuid } from 'uuid'

export default class Receita extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model:Receita){
    model.id = uuid()
  }

  @column()
  public titulo: string

  @column()
  public descricao: string

  @column()
  public id_usuario: string

  @belongsTo(() => Usuario, {
    localKey:'id_usuario'
  })
  public usuario: BelongsTo<typeof Usuario>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
