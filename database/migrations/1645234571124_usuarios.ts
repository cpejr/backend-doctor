import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Usuarios extends BaseSchema {
  protected tableName = 'usuarios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome').notNullable()
      table.string('email').notNullable()
      table.string('senha').notNullable()
      table.string('token_usuario').nullable()
      table.string('telefone', 11).notNullable()
      table.date('data_nascimento').notNullable()
      table.string('convenio').nullable()
      table.enu('tipo', ['MASTER', 'SECRETARIA', 'PACIENTE']).notNullable()
      table.boolean('aprovado').nullable()
      table.string('avatar_url').nullable()
      table.string('codigo').nullable()
      table.integer('id_endereco').unsigned().references('id').inTable('enderecos')
      table.integer('id_consultorio').unsigned().references('id').inTable('consultorios').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
