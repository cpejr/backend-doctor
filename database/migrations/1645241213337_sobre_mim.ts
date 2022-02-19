import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SobreMim extends BaseSchema {
  protected tableName = 'sobre_mim'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('imagem_um').notNullable()
      //definir tipo de arquivo
      table.string('titulo_um').notNullable()
      table.time('texto_um').notNullable()
      table.string('imagem_dois').notNullable()
      //definir tipo de arquivo
      table.string('titulo_dois').notNullable()
      table.time('texto_dois').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
