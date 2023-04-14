import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FormularioPacientes extends BaseSchema {
  protected tableName = 'formulario_pacientes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.json('respostas').nullable()
      table.string('midia_url').nullable()
      table.string('word').nullable()
      table.boolean('status').notNullable()
      table.boolean('notificacao_ativa').notNullable()
      table.string('id_usuario').references('id').inTable('usuarios').onDelete('CASCADE')
      table.string('id_formulario').references('id').inTable('formularios').onDelete('CASCADE')

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
