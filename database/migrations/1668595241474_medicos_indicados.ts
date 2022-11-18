import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MedicosIndicados extends BaseSchema {
  protected tableName = 'medicos_indicados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('id_indicacao_especifica').references('id').inTable('indicacao_especificas').onDelete('CASCADE').notNullable()
      table.string('nome')
      table.string('telefone', 11)
      table.string('local_atendimento')
      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
