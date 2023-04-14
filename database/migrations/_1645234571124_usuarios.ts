import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Usuarios extends BaseSchema {
  protected tableName = 'usuarios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('nome').notNullable()
      table.string('email').notNullable()
      table.string('senha').notNullable()
      table.string('cpf').notNullable()
      table.string('token_usuario').nullable()
      table.string('telefone', 11).notNullable()
      table.date('data_nascimento').notNullable()
      table.string('convenio').nullable()
      table.string('nome_cuidador').nullable()
      table.string('telefone_cuidador', 11).nullable()
      table.enu('tipo', ['MASTER', 'SECRETARIA(O)', 'PACIENTE']).notNullable()
      table.boolean('aprovado').nullable()
      table.string('avatar_url').nullable()
      table.string('codigo').nullable()
      table.string('id_endereco').references('id').inTable('enderecos').onDelete('CASCADE')
      table
        .string('id_consultorio')
        .references('id')
        .inTable('consultorios')
        .nullable()
        .onDelete('CASCADE')

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
