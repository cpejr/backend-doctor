import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TokenNotificacaos extends BaseSchema {
  protected tableName = 'token_notificacaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('id_usuario').references('id').inTable('usuarios').onDelete('CASCADE').notNullable()
      table.string('token').notNullable()
      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
