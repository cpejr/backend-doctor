import Database from '@ioc:Adonis/Lucid/Database'
import FormulariosPacientesDTO from 'App/DTO/FormulariosPacientesDTO'

export default class FormulariosPacientesRepository {
  public static async find(params: FormulariosPacientesDTO) {
    const result = await Database.query()
      .from('formulario_pacientes')
      .where(params)
      .join('usuarios', 'usuarios.id', '=', 'formulario_pacientes.id_usuario')
      .select('formulario_pacientes.*')
      .select('usuarios.email', 'usuarios.nome', 'usuarios.avatar_url', 'usuarios.data_nascimento')
      .join('formularios', 'formularios.id', '=', 'formulario_pacientes.id_formulario')
      .select(
        'formularios.titulo',
        'formularios.urgencia',
        'formularios.tipo',
        'formularios.perguntas',
        'formularios.visualizacao_secretaria'
      )
    return result
  }
}
