import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  public id: number

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
}
