import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ExameMarcados extends BaseSchema {
  protected tableName = 'exame_marcados'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.datetime('data_hora').notNullable()
      table.string('descricao').nullable()
      table.datetime('data_envio').nullable()
      table.datetime('data_devolucao').nullable()
      table.datetime('data_pagamento').nullable()
      table.boolean('esta_atrasado').nullable()
      table.boolean('esta_disponivel').nullable()
      table.integer('id_usuario').unsigned().references('id').inTable('usuarios')
      table.integer('id_exame').unsigned().references('id').inTable('exames')
      table.integer('id_consultorio').unsigned().references('id').inTable('consultorios')
      table.integer('id_dispositivo').unsigned().references('id').inTable('dispositivos').nullable()

      table.timestamp('data_criacao', { useTz: true })
      table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
