import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Consultorios extends BaseSchema {
  protected tableName = 'consultorios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.integer('id_endereco').unsigned().references('id').inTable('enderecos');

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
