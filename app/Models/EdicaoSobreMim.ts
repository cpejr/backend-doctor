import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Arquivo from './Arquivo'

export default class EdicaoSobreMim extends BaseModel {

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: EdicaoSobreMim){
    model.id = uuid()
  }

  @column()
  public titulo_um: string

  @column()
  public id_imagem_um: string

  @column()
  public texto_um: string

  @column()
  public titulo_dois: string

  @column()
  public id_imagem_dois: string

  @column()
  public texto_dois: string

  @belongsTo(() => Arquivo, {
    foreignKey: 'id_imagem_um',
    localKey: 'id'
  })
  public imagem_um: BelongsTo<typeof Arquivo>

  @belongsTo(() => Arquivo, {
    foreignKey: 'id_imagem_dois',
    localKey: 'id'
  })
  public imagem_dois: BelongsTo<typeof Arquivo>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
