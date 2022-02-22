import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class IndicacaoEspecifica extends BaseSchema {
  protected tableName = 'indicacao_especifica'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('titulo').notNullable()
      table.string('texto').notNullable()

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
