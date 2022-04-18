import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Conversas extends BaseSchema {
  protected tableName = 'conversas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('id_remetente').references('id').inTable('usuarios')
      table.string('id_destinatario').references('id').inTable('usuarios')

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
