import { DateTime } from "luxon";

export default interface ConsultasDTO {
  id?: number
  data_hora?: DateTime
  duracao_em_minutos?: number
  descricao?: string
  avaliacao?: number
  id_usuario?: number
  id_consultorio?: number
}
