import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SobreMims extends BaseSchema {
  protected tableName = 'sobre_mims'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('imagem_um').notNullable()
      table.string('titulo_um').notNullable()
      table.string('texto_um', 10000).notNullable()
      table.string('imagem_dois').notNullable()
      table.string('titulo_dois').notNullable()
      table.string('texto_dois', 10000).notNullable()

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
