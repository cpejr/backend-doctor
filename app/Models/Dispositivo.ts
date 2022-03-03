import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ExameMarcado from './ExameMarcado'

export default class Dispositivo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: string

  @column()
  public esta_disponivel: boolean

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime

  @hasMany(() => ExameMarcado, {
    foreignKey: 'id_dispositivo'
  })
  public exame_marcado: HasMany<typeof ExameMarcado>
}
