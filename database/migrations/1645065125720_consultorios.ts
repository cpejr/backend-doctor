import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Consultorios extends BaseSchema {
  protected tableName = 'consultorios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('nome').notNullable()
      table.string('id_endereco').references('id').inTable('enderecos').onDelete('CASCADE')
      table.enu('tipo', ['CONSULTA', 'EXAME']).notNullable()

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
