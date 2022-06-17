import Database from '@ioc:Adonis/Lucid/Database'
import FormulariosPacientesDTO from 'App/DTO/FormulariosPacientesDTO'

export default class FormulariosPacientesRepository {
  public static async find(params: FormulariosPacientesDTO) {
    const result = await Database.query()
      .from('formulario_pacientes')
      .where(params)
      .join('formularios', 'formularios.id', '=', 'formulario_pacientes.id_formulario')
      .join('usuarios', 'usuarios.id', '=', 'formulario_pacientes.id_usuario')
      .select('formulario_pacientes.*')
      .select('formularios.perguntas','formularios.titulo', 'formularios.urgencia', 'formularios.tipo')
      .select('usuarios.email')
    return result
  }
}
