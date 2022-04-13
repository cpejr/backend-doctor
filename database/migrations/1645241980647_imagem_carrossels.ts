import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ImagemCarrossels extends BaseSchema {
  protected tableName = 'imagem_carrossels'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('imagem').notNullable()

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
