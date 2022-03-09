import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Formulario from './Formulario'

export default class FormularioPaciente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public respostas: JSON

  @column()
  public midia_url: string

  @column()
  public word: string

  @column()
  public status: boolean

  @column()
  public id_usuario: number

  @belongsTo(() => Usuario, {
    localKey:'id_usuario'
  })
  public usuario: BelongsTo<typeof Usuario>

  @column()
  public id_formulario: number

  @belongsTo(() => Formulario, {
    localKey:'id_formulario'
  })
  public formulario: BelongsTo<typeof Formulario>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
