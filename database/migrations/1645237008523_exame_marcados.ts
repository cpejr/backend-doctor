import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ExameMarcados extends BaseSchema {
  protected tableName = 'exame_marcados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.time('horario').notNullable()
      table.date('data').notNullable()
      table.string('descricao').nullable()
      table.date('data_envio').notNullable()
      table.date('data_devolucao').notNullable()
      table.date('data_pagamento').notNullable()
      table.boolean('esta_atrasado').notNullable()
      table.boolean('esta_disponivel').notNullable()
      table.integer('id_usuario').unsigned().references('id').inTable('usuarios');
      table.integer('id_exame').unsigned().references('id').inTable('exames');
      table.integer('id_consultorio').unsigned().references('id').inTable('consultorios');
      table.integer('id_dispositivo').unsigned().references('id').inTable('dispositivos');

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.timestamp('data_criacao', { useTz: true })
       table.timestamp('data_atualizacao', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
