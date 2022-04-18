import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Formulario from './Formulario'
import { v4 as uuid } from 'uuid'
export default class FormularioPaciente extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model:FormularioPaciente){
    model.id = uuid()
  }

  @column()
  public respostas: JSON

  @column()
  public midia_url: string

  @column()
  public word: string

  @column()
  public status: boolean

  @column()
  public id_usuario: string

  @belongsTo(() => Usuario, {
    localKey:'id_usuario'
  })
  public usuario: BelongsTo<typeof Usuario>

  @column()
  public id_formulario: string

  @belongsTo(() => Formulario, {
    localKey:'id_formulario'
  })
  public formulario: BelongsTo<typeof Formulario>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
