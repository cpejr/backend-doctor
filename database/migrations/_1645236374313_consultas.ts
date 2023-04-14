import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Consultas extends BaseSchema {
  protected tableName = 'consultas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.datetime('data_hora').notNullable()
      table.integer('duracao_em_minutos').notNullable()
      table.string('descricao').nullable()
      table.string('tipo').notNullable()
      table.integer('avaliacao').nullable()
      table.string('id_usuario').references('id').inTable('usuarios').onDelete('CASCADE')
      table.string('id_consultorio').references('id').inTable('consultorios').onDelete('CASCADE')
      table.boolean('notificacao').nullable()

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
