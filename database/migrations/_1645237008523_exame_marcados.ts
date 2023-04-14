import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ExameMarcados extends BaseSchema {
  protected tableName = 'exame_marcados'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.datetime('data_hora').notNullable()
      table.string('descricao').nullable()
      table.datetime('data_envio').nullable()
      table.datetime('data_devolucao').nullable()
      table.datetime('data_pagamento').nullable()
      table.boolean('esta_atrasado').nullable()
      table.boolean('esta_disponivel').nullable()
      table.string('id_usuario').references('id').inTable('usuarios').onDelete('CASCADE')
      table.string('id_exame').references('id').inTable('exames').onDelete('CASCADE')
      table.string('id_consultorio').references('id').inTable('consultorios').onDelete('CASCADE')
      table.string('id_dispositivo').references('id').inTable('dispositivos').nullable().onDelete('CASCADE')

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
