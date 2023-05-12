import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Homes extends BaseSchema {
  protected tableName = 'homes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('video').notNullable()
      table.string('titulo_um', 10000).notNullable()
      table.string('texto_um', 10000).notNullable()
      table.string('titulo_dois', 10000).notNullable()
      table.string('texto_dois', 10000).notNullable()
      table.string('titulo_tres', 10000).notNullable()
      table.string('texto_tres', 10000).notNullable()

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
