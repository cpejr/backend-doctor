import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Consultorios extends BaseSchema {
  protected tableName = 'consultorios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable()
      table.string('nome').notNullable()


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
