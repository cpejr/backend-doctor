import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ApiTokens extends BaseSchema {
  protected tableName = 'api_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_usuario').unsigned().references('id').inTable('usuarios').onDelete('CASCADE')
      table.string('nome').notNullable()
      table.string('tipo').notNullable()
      table.string('token', 64).notNullable().unique()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('data_expiracao', { useTz: true }).nullable()
      table.timestamp('data_criacao', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
