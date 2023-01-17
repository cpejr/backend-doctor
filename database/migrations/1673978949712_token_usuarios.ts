import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TokenUsuarios extends BaseSchema {
  protected tableName = 'token_usuarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('token_dispositivo').primary()
      table.string('id_usuario').references('id').inTable('usuarios')

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
