import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Formularios extends BaseSchema {
  protected tableName = 'formularios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('titulo').notNullable()
      table.string('tipo').notNullable()
      table.string('finalidade').notNullable()
      table.json('perguntas').notNullable()
      table.integer('urgencia').notNullable()

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
