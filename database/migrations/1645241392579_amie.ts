import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Amie extends BaseSchema {
  protected tableName = 'amie'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('imagem_um').notNullable()
      //definir tipo de arquivo
      table.string('texto').notNullable()
      table.string('imagem_dois').notNullable()
      //definir tipo de arquivo

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
