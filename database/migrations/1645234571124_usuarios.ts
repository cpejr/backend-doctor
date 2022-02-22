import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Usuarios extends BaseSchema {
  protected tableName = 'usuarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome').notNullable()
      table.string('email').notNullable()
      table.string('telefone', 11).notNullable()
      table.date('data_nascimento').notNullable()
      table.string('convenio').notNullable()
      table.enu('tipo', ['MASTER', 'SECRETARIA', 'PACIENTE']).notNullable()
      table.boolean('aprovado').notNullable()
      table.string('avatar_url').notNullable()
      table.string('codigo').notNullable()
      table.integer('id_endereco').unsigned().references('id').inTable('enderecos');
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
