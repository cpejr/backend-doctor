import Env from '@ioc:Adonis/Core/Env'
import axios from "axios"

const whatsappApi = axios.create({
  baseURL: Env.get("WHATSAPP_API_URL"),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Env.get("WHATSAPP_TOKEN")}`
  }
});

export const mensagemComunicado = (nome_paciente: String) => {
  const PHONE_ID = Env.get("WHATSAPP_SENDER_PHONE_ID")
  return whatsappApi.post(`${PHONE_ID}/messages`, {
    messaging_product: "whatsapp",
    type: "template",
    to: Env.get("WHATSAPP_FORMULARIO_RECEIVER_NUM"),
    template: {
      name: Env.get("WHATSAPP_FORMULARIO_TEMPLATE_NAME"),
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

export const mensagemPagamento = (nome_paciente: String) => {
  const PHONE_ID = Env.get("WHATSAPP_SENDER_PHONE_ID")
  return whatsappApi.post(`${PHONE_ID}/messages`, {
    messaging_product: "whatsapp",
    type: "template",
    to: Env.get("WHATSAPP_FORMULARIO_RECEIVER_NUM"),
    template: {
      name: Env.get("WHATSAPP_PAGAMENTO_EXAME_TEMPLATE_NAME"),
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


export const mensagemFormularioUrgencia = (nome_paciente: string) => {
  const PHONE_ID = Env.get("WHATSAPP_SENDER_PHONE_ID")
  const resposta = whatsappApi.post(`${PHONE_ID}/messages`, {
    messaging_product: "whatsapp",
    type: "template",
    to: Env.get("WHATSAPP_FORMULARIO_RECEIVER_NUM"),
    template: {
      name: Env.get("WHATSAPP_FORMULARIO_URGENCIA_TEMPLATE_NAME"),
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
  return resposta
}

export const sendMessage = async () => {
  const WHATSAPP_INSTANCE_ID = Env.get("WHATSAPP_INSTANCE_ID");
  const WHATSAPP_TOKEN = Env.get("WHATSAPP_TOKEN");
  const WHATSAPP_FORMULARIO_RECEIVER_NUM = Env.get("WHATSAPP_FORMULARIO_RECEIVER_NUM");
  const API_URL = "https://api.chat-api.com/instance"+WHATSAPP_INSTANCE_ID+"/message?token="+WHATSAPP_TOKEN;
  const data = { WHATSAPP_FORMULARIO_RECEIVER_NUM, body: "message" }
  try {
    const response = await axios.post(API_URL, data)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
