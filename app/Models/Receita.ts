import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'


export default class Receita extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: string

  @column()
  public descricao: string

  @column()
  public id_usuario: number

  @belongsTo(() => Usuario, {
    localKey:'id_usuario'
  })
  public usuario: BelongsTo<typeof Usuario>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
