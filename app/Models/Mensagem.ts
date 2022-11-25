import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Conversa from './Conversa'
import { v4 as uuid } from 'uuid'
import Usuario from './Usuario'
export default class Mensagem extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model:Mensagem){
    model.id = uuid()
  }

  @column()
  public conteudo: string

  @column()
  public media_url: string | null

  @column()
  public foi_visualizado: boolean

  @column()
  public id_conversa: string

  @column()
  public id_usuario: string

  @belongsTo(() => Conversa, {
    foreignKey: 'id_conversa',
  })
  public conversa: BelongsTo<typeof Conversa>

  @belongsTo(() => Usuario, {
    foreignKey: 'id_usuario',
  })
  public usuario: BelongsTo<typeof Usuario>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
