import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Formularios extends BaseSchema {
  protected tableName = 'formularios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.string('titulo')
      table.string('tipo')
      table.string('finalidade')
      table.json('perguntas')
      table.integer('urgencia')
      
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
