import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Mensagems extends BaseSchema {
  protected tableName = 'mensagems'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('mensagem').notNullable()
      table.datetime('data_envio').notNullable()
      table.string('media_url').nullable()
      table.boolean('foi_enviado').notNullable()
      table.boolean('foi_visualizado').notNullable()
      table.integer('id_conversa').unsigned().references('id').inTable('conversas')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
