import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Conversas extends BaseSchema {
  protected tableName = 'conversas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('id_criador').references('id').inTable('usuarios').onDelete('CASCADE')
      table.string('id_receptor').references('id').inTable('usuarios').onDelete('CASCADE')
      table.enu('tipo',['EXAME']).nullable()
      table.boolean('ativada').defaultTo(false).notNullable()
      table.boolean('finalizada').defaultTo(false).notNullable()

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
