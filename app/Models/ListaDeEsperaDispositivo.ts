import { DateTime } from 'luxon'
import Usuario from './Usuario'
import Dispositivo from './Dispositivo'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

export default class ListaDeEsperaDispositivo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public posicao: number

  @column()
  public esta_disponivel: boolean

  @column()
  public id_usuario: number

  @belongsTo(() => Usuario, {
    localKey:'id_usuario'
  })
  public usuario: BelongsTo<typeof Usuario>

  @column()
  public id_dispositivo: number

  @belongsTo(() => Dispositivo, {
    localKey:'id_dispositivo'
  })
  public dispositivo: BelongsTo<typeof Dispositivo>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
