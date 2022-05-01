import { DateTime } from 'luxon'
import Endereco from './Endereco'
import Usuario from './Usuario'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
export default class Consultorio extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model:Consultorio){
    if (!model.$dirty.id) {
      model.id = uuid()
    }
  }

  @column()
  public nome: string

  @column()
  public id_endereco: string

  @belongsTo(() => Endereco, {
    localKey: 'id_endereco'
  })
  public endereco: BelongsTo<typeof Endereco>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime

  @hasMany(() => Usuario, {
    foreignKey: 'id_consultorio'
  })
  public usuario: HasMany<typeof Usuario>
}
