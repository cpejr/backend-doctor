import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Receitas extends BaseSchema {
  protected tableName = 'receitas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('titulo').notNullable()
      table.string('descricao').notNullable()
      table.integer('id_usuario').unsigned().references('id').inTable('usuarios')

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
