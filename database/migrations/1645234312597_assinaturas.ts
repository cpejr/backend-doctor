import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Assinaturas extends BaseSchema {
  protected tableName = 'assinaturas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('doc_assinatura').notNullable()

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
