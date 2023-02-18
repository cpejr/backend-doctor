export default interface FormulariosDTO {
  id?: number
  titulo?: string
  tipo?: string
  finalidade?: string
  perguntas?: JSON
  urgencia?: number
  visualizacao_secretaria?: boolean
}
