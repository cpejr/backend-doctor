import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Mensagems extends BaseSchema {
  protected tableName = 'mensagems'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('conteudo').notNullable()
      table.string('media_url').nullable()
      table.boolean('foi_visualizado').notNullable()
      table.string('id_conversa').references('id').inTable('conversas').onDelete('CASCADE')
      table.string('id_usuario').references('id').inTable('usuarios').onDelete('CASCADE')

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
