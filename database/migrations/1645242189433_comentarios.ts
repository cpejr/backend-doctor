import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comentarios extends BaseSchema {
  protected tableName = 'comentarios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('comentario', 10000).notNullable()
      table.string('resposta', 10000).nullable()
      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
