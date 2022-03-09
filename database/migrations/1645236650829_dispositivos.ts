import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Dispositivos extends BaseSchema {
  protected tableName = 'dispositivos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('titulo').notNullable()
      table.boolean('esta_disponivel').notNullable()

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
