import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterarFormulariosVisualizarSecretarias extends BaseSchema {
  protected tableName = 'formularios'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('visualizacao_secretaria').nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('visualizacao_secretaria')
    })
  }
}
