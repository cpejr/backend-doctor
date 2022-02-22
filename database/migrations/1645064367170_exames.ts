import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Exames extends BaseSchema {
  protected tableName = 'exames'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('titulo').notNullable()
      table.text('texto','longtext').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.timestamp('data_criacao', { useTz: true })
       table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
