import { DateTime } from 'luxon'
import Endereco from './Endereco'
import Consultorio from './Consultorio'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Receita from './Receita'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public email: string

  @column()
  public telefone: string

  @column()
  public data_nascimento: Date

  @column()
  public convenio: string

  @column()
  public tipo: string

  @column()
  public aprovado: boolean

  @column()
  public avatar_url: string

  @column()
  public codigo: string

  @column()
  public id_endereco: number

  @column()
  public id_consultorio: number

  @belongsTo(() => Endereco, {
    localKey: 'id_endereco'
  })
  public endereco: BelongsTo<typeof Endereco>

  @belongsTo(() => Consultorio, {
    localKey: 'id_endereco'
  })
  public consultorio: BelongsTo<typeof Consultorio>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime

  @hasMany(() => Receita, {
    foreignKey: 'id_usuario'
  })
  public receita: HasMany<typeof Receita>
}
