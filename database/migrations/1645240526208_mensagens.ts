import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Mensagens extends BaseSchema {
  protected tableName = 'mensagens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('mensagem').notNullable()
      table.date('data_envio').notNullable()
      table.time('hora_envio').notNullable()
      table.string('media_url').nullable()
      table.boolean('foi_enviado').notNullable()
      table.boolean('foi_visualizado').notNullable()
      table.integer('id_conversa').unsigned().references('id').inTable('conversas');

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
