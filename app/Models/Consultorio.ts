import { DateTime } from 'luxon'
import Endereco from './Endereco'
import Usuario from './Usuario'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Consultorio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public id_endereco: number

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
