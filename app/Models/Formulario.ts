import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import { typeName } from 'aws-sdk/clients/customerprofiles'
export default class Formulario extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model:Formulario){
    if (!model.$dirty.id) {
      model.id = uuid()
    }
  }

  @column()
  public titulo: string

  @column()
  public tipo: string

  @column()
  public finalidade: string

  @column()
  public perguntas: JSON

  @column()
  public urgencia: number

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime
}
