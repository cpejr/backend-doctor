import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Homes extends BaseSchema {
  protected tableName = 'homes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('video').notNullable()
      //definir tipo de arquivo
      table.string('titulo_um').notNullable()
      table.time('texto_um').notNullable()
      table.string('titulo_dois').notNullable()
      table.time('texto_dois').notNullable()
      table.string('titulo_tres').notNullable()
      table.time('texto_tres').notNullable()
      table.string('titulo_quatro').notNullable()
      table.time('texto_quatro').notNullable()
      table.time('imagem_quatro').notNullable()
      //definir tipo de arquivo

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
