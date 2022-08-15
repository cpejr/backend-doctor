import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Arquivos extends BaseSchema {
  protected tableName = 'arquivos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nome')
      table.string('chave')
      table.string('url')
      table.string('tipo_conteudo')


      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
