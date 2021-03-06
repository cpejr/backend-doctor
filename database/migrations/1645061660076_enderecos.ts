import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Enderecos extends BaseSchema {
  protected tableName = 'enderecos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('cep', 8).notNullable()
      table.string('pais').notNullable()
      table.string('estado', 2).notNullable()
      table.string('cidade').notNullable()
      table.string('bairro').notNullable()
      table.string('rua').notNullable()
      table.integer('numero').notNullable()
      table.string('complemento').nullable()

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
