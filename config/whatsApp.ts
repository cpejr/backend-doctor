import Env from '@ioc:Adonis/Core/Env'
import axios from "axios"

const whatsappApi = axios.create({
  baseURL: Env.get("WHATSAPP_API_URL"),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Env.get("WHATSAPP_TOKEN")}`
  }
});

export const mensagemComunicadoUrgencia = (nome_paciente: String) => {
  const PHONE_ID = Env.get("WHATSAPP_SENDER_PHONE_ID")
  return whatsappApi.post(`${PHONE_ID}/messages`, {
    messaging_product: "whatsapp",
    type: "template",
    to: Env.get("WHATSAPP_FORMULARIO_RECEIVER_NUM"),
    template: {
      name: Env.get("WHATSAPP_COMUNICADO_URGENCIA_TEMPLATE_NAME"),
      language: { code: "pt_BR" },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: nome_paciente,
            },
          ],
        },
      ],
    },
  });
}

export const mensagemExameMarcado = (nome_paciente: String) => {
  const PHONE_ID = Env.get("WHATSAPP_SENDER_PHONE_ID")
  return whatsappApi.post(`${PHONE_ID}/messages`, {
    messaging_product: "whatsapp",
    type: "template",
    to: Env.get("WHATSAPP_FORMULARIO_RECEIVER_NUM"),
    template: {
      name: Env.get("WHATSAPP_EXAME_MARCADO_TEMPLATE_NAME"),
      language: { code: "pt_BR" },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: nome_paciente,
            },
          ],
        },
      ],
    },
  });
}

export const mensagemFinalizarExame = (nome_paciente: string, telefone: string, endereco: string) => {
  const PHONE_ID = Env.get("WHATSAPP_SENDER_PHONE_ID")
  const body = {
    messaging_product: "whatsapp",
    type: "template",
    to: Env.get("WHATSAPP_FORMULARIO_RECEIVER_NUM"),
    template: {
      name: Env.get("WHATSAPP_FINALIZAR_EXAME_TEMPLATE_NAME"),
      language: { code: "pt_BR" },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: nome_paciente,
            },
            {
              type: "text",
              text: telefone,
            },
            {
              type: "text",
              text: endereco,
            },
          ],
        },
      ],
    },
  }
  return whatsappApi.post(`${PHONE_ID}/messages`,
    body
  );
}

export const mensagemConfirmouPagamento = (nome_secretaria: string, nome_dispositivo: string, nome_paciente: string, telefone: string, endereco: string) => {
  const PHONE_ID = Env.get("WHATSAPP_SENDER_PHONE_ID")
  const body = {
    messaging_product: "whatsapp",
    type: "template",
    to: Env.get("WHATSAPP_FORMULARIO_RECEIVER_NUM"),
    template: {
      name: Env.get("WHATSAPP_CONFIRMOU_PAGAMENTO_TEMPLATE_NAME"),
      language: { code: "pt_BR" },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: nome_secretaria,
            },
            {
              type: "text",
              text: nome_dispositivo,
            },
            {
              type: "text",
              text: nome_paciente,
            },
            {
              type: "text",
              text: telefone +"\\n"+ endereco,
            },
          ],
        },
      ],
    },
  }
  return whatsappApi.post(`${PHONE_ID}/messages`,
    body
  );
}




