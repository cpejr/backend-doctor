import { DateTime } from "luxon";

export default interface MensagemsDTO {
  id?: number
  mensagem?: string
  data_envio?: DateTime
  media_url?: string
  foi_enviado?: boolean
  foi_visualizado?: boolean
  id_conversa?: string
}
