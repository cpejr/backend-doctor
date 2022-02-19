import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Receitas extends BaseSchema {
  protected tableName = 'receitas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('titulo').notNullable()
      table.string('descricao').notNullable()
      table.date('data_criacao').notNullable()
      table.integer('id_usuario').unsigned().references('id').inTable('usuarios');

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