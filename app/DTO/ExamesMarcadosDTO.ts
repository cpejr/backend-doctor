import {DateTime} from "luxon" 

export default interface ExamesMarcadosDTO {
    id?: number
    data_hora?: DateTime
    descricao?: string
    data_envio?: Date
    data_devolucao?: Date
    data_pagamento?: Date
    esta_atrasado?: boolean
    esta_disponivel?: boolean
    id_usuario?: number
    id_exame?: number
    id_consultorio?: number
    id_dispositivo?: number
  }
  