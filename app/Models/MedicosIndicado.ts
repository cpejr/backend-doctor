import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import IndicacaoEspecifica from './IndicacaoEspecifica'
import { v4 as uuid } from 'uuid'

export default class MedicosIndicado extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID(model: MedicosIndicado) {
    model.id = uuid()
  }

  @column()
  public id_indicacao: string

  @column()
  public nome: string

  @column()
  public telefone: string

  @column()
  public local_atendimento: string

  @belongsTo(() => IndicacaoEspecifica, {
    localKey: 'id'
  })
  public user: BelongsTo<typeof IndicacaoEspecifica>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
