import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ListaDeEsperaDispositivos extends BaseSchema {
  protected tableName = 'lista_de_espera_dispositivos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('posicao').notNullable()
      table.boolean('esta_disponivel').notNullable()
      table.integer('id_usuario').unsigned().references('id').inTable('usuarios')
      table.integer('id_dispositivo').unsigned().references('id').inTable('dispositivos')

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
