import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Conversas extends BaseSchema {
  protected tableName = 'conversas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_remetente').unsigned().references('id').inTable('usuarios');
      table.integer('id_destinatario').unsigned().references('id').inTable('usuarios');

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
