import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Consultorio from './Consultorio'
import { v4 as uuid } from 'uuid'
import { Collection } from 'mongoose'
export default class Consulta extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID(model: Consulta) {
    model.id = uuid()
  }

  @column()
  public data_hora: DateTime

  @column()
  public duracao_em_minutos: number

  @column()
  public descricao: string

  @column()
  public avaliacao: number

  @column()
  public tipo: string

  @column()
  public id_usuario: string

  @column()
  public notificacao: boolean

  @column()
  public id_consultorio: string

  @belongsTo(() => Usuario, {
    localKey: 'id_usuario',
  })
  public usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => Consultorio, {
    localKey: 'id_consultorio',
  })
  public consultorio: BelongsTo<typeof Consultorio>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
