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
  console.log("ZAPZAP");
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
  console.log("whatssap     "+ resposta);
  return resposta
}

export const sendMessage = async (message) => {
  const PHONE_ID = Env.get("WHATSAPP_SENDER_PHONE_ID");
  const WHATSAPP_API_URL = "https://api.chat-api.com/instance${PHONE_ID}/message";
  const data = {
    phone: Env.get("WHATSAPP_FORMULARIO_RECEIVER_NUM"),
    body: message,
  };
  try {
    const response = await axios.post(WHATSAPP_API_URL, data);
    console.log(response.data); // Exibe a resposta da API
  } catch (error) {
    console.error(error);
  }
};