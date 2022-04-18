import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class IndicacaoEspecificas extends BaseSchema {
  protected tableName = 'indicacao_especificas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('titulo').notNullable()
      table.string('texto').notNullable()

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
