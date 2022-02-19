import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Consultas extends BaseSchema {
  protected tableName = 'consultas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.time('horario').notNullable()
      table.date('data').notNullable()
      table.time('duracao').notNullable()
      table.string('descricao').nullable()
      table.integer('avaliacao').notNullable()
      table.integer('id_usuario').unsigned().references('id').inTable('usuarios');
      table.integer('id_consultorio').unsigned().references('id').inTable('consultorios');

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
