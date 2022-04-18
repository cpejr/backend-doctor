import { DateTime } from 'luxon'
import Consultorio from './Consultorio'
import { BaseModel, beforeCreate, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model:Endereco){
    model.id = uuid()
  }

  @column()
  public cep: string

  @column()
  public pais: string

  @column()
  public estado: string

  @column()
  public cidade: string

  @column()
  public bairro: string

  @column()
  public rua: string

  @column()
  public numero: number

  @column()
  public complemento?: string

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime

  @hasMany(() => Consultorio, {
    foreignKey: 'id_endereco'
  })
  public consultorio: HasMany<typeof Consultorio>
}
