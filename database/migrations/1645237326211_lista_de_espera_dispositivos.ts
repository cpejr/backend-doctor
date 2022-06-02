import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ListaDeEsperaDispositivos extends BaseSchema {
  protected tableName = 'lista_de_espera_dispositivos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.integer('posicao').notNullable()
      table.boolean('esta_disponivel').notNullable()
      table.string('id_usuario').references('id').inTable('usuarios').onDelete('CASCADE')
      table.string('id_dispositivo').references('id').inTable('dispositivos')

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
