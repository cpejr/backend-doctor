import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ExameMarcado from './ExameMarcado'


export default class Exame extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: string

  @column()
  public texto: string

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime

  @hasMany(() => ExameMarcado, {
    foreignKey: 'id_exame'
  })
  public exame_marcado: HasMany<typeof ExameMarcado>
}
