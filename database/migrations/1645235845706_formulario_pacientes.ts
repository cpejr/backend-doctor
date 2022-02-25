import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FormularioPacientes extends BaseSchema {
  protected tableName = 'formulario_pacientes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.json('respostas').notNullable()
      table.string('midia_url').nullable()
      table.string('word').nullable()
      table.boolean('status').notNullable()
      table.integer('id_usuario').unsigned().references('id').inTable('usuarios')
      table.integer('id_formulario').unsigned().references('id').inTable('formularios')

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
