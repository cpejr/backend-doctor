import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ListaDeEsperaDispositivos extends BaseSchema {
  protected tableName = 'lista_de_espera_dispositivos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('posicao').nullable()
      table.boolean('esta_disponivel').notNullable()
      table.integer('id_usuario').unsigned().references('id').inTable('usuarios');
      table.integer('id_dispositivo').unsigned().references('id').inTable('dispositivos');

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
