import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ExameMarcado from './ExameMarcado'
import { v4 as uuid } from 'uuid'

export default class Exame extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model:Exame){
    model.id = uuid()
  }

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
