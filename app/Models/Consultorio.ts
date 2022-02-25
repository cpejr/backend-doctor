import { DateTime } from 'luxon'
import Endereco from './Endereco'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

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
}
