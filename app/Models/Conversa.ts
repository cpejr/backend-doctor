import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Mensagem from './Mensagem'
import { v4 as uuid } from 'uuid'
export default class Conversa extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model:Conversa){
    model.id = uuid()
  }

  @column()
  public id_criador: string

  @column()
  public id_receptor: string

  @column()
  public ativada: boolean

  @hasMany(() => Mensagem, {
    foreignKey: 'id_conversa'
  })
  public mensagem: HasMany<typeof Mensagem>

  @belongsTo(() => Usuario, {
    foreignKey: 'id_criador'
  })
  public criador: BelongsTo<typeof Usuario>

  @belongsTo(() => Usuario, {
    foreignKey: 'id_receptor'
  })
  public receptor: BelongsTo<typeof Usuario>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime

}
