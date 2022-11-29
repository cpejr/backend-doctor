import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SobreMims extends BaseSchema {
  protected tableName = 'sobre_mims'
  protected limiteCaracteresTexto = 10000

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('titulo_um')
      table.string('id_imagem_um').references('id').inTable('arquivos')
      table.string('texto_um', this.limiteCaracteresTexto)
      table.string('titulo_dois')
      table.string('id_imagem_dois').references('id').inTable('arquivos')
      table.string('texto_dois', this.limiteCaracteresTexto)

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
