import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Arquivos extends BaseSchema {
  protected tableName = 'arquivos'
  protected limiteCaracteresTexto = 10000

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('nome')
      table.string('chave')
      table.string('url', this.limiteCaracteresTexto).nullable().defaultTo(null)
      table.string('tipo_conteudo')
      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
