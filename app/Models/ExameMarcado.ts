import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Exame from './Exame'
import Consultorio from './Consultorio'
import Dispositivo from './Dispositivo'

export default class ExameMarcado extends BaseModel {
  public static table = 'exame_marcados'

  @column({ isPrimary: true })
  public id: number

  @column()
  public data_hora: DateTime

  @column()
  public descricao: string

  @column()
  public data_envio: DateTime

  @column()
  public data_devolucao: DateTime

  @column()
  public data_pagamento: DateTime

  @column()
  public esta_atrasado: boolean

  @column()
  public esta_disponivel: boolean

  @column()
  public id_usuario: number

  @column()
  public id_exame: number

  @column()
  public id_consultorio: number

  @column()
  public id_dispositivo: number

  @belongsTo(() => Usuario, {
    localKey: 'id_usuario'
  })
  public usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => Exame, {
    localKey: 'id_exame'
  })
  public exame: BelongsTo<typeof Exame>

  @belongsTo(() => Consultorio, {
    localKey: 'id_consultorio'
  })
  public consultorio: BelongsTo<typeof Consultorio>

  @belongsTo(() => Dispositivo, {
    localKey: 'id_dispositivo'
  })
  public dispositivo: BelongsTo<typeof Dispositivo>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
