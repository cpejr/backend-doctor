import { DateTime } from 'luxon'
import Endereco from './Endereco'
import Consultorio from './Consultorio'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
  beforeSave,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm'
import Receita from './Receita'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuid } from 'uuid'
import Mensagem from './Mensagem'
export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID(model: Usuario) {
    if (!model.$dirty.id) {
      model.id = uuid()
    }
  }

  @column()
  public nome: string

  @column()
  public email: string

  @column()
  public cpf: string

  @column({ serializeAs: null })
  public senha: string

  @column()
  public token_usuario?: string

  @column()
  public telefone: string

  @column()
  public data_nascimento: Date

  @column()
  public convenio: string

  @column()
  public nome_cuidador: string

  @column()
  public telefone_cuidador: string

  @column()
  public tipo: string

  @column()
  public aprovado: boolean

  @column()
  public avatar_url: string

  @column()
  public codigo: string

  @column()
  public id_endereco: string

  @column()
  public id_consultorio: string

  @belongsTo(() => Endereco, {
    localKey: 'id_endereco',
  })
  public endereco: BelongsTo<typeof Endereco>

  @belongsTo(() => Consultorio, {
    localKey: 'id_consultorio',
  })
  public consultorio: BelongsTo<typeof Consultorio>

  @column.dateTime({ autoCreate: true })
  public data_criacao: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public data_atualizacao: DateTime

  @hasMany(() => Receita, {
    foreignKey: 'id_usuario',
  })
  public receita: HasMany<typeof Receita>

  @hasMany(() => Mensagem, {
    foreignKey: 'id_usuario'
  })
  public mensagem: HasMany<typeof Mensagem>

  @beforeSave()
  public static async hashPassword(usuario: Usuario) {
    if (usuario.$dirty.senha) {
      usuario.senha = await Hash.make(usuario.senha)
    }
  }
}
