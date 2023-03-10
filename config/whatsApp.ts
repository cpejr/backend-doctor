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
  }).then(response => {
    console.log(response.data);
  }).catch(error => {
    console.log("oie");
    console.error(error);
  });
}

export const mensagemPagamento = (nome_paciente: String) => {
  const PHONE_ID = Env.get("WHATSAPP_SENDER_PHONE_ID");
  console.log(nome_paciente);
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

const conteudoMensagemTeste = {
  messaging_product: 'whatsapp',
  type: 'text',
  from: Env.get("WHATSAPP_SENDER_PHONE_ID"),
  to: Env.get("WHATSAPP_FORMULARIO_RECEIVER_NUM"),
  text: {}
};

export const mensagemTeste = () => {

  whatsappApi.post('', {
    messaging_product: "whatsapp",
    from: Env.get("WHATSAPP_SENDER_PHONE_ID"),
    to: Env.get("WHATSAPP_FORMULARIO_RECEIVER_NUM"),
    "text": {
      "body": "amanhã adiciona meu número na lista de permissão pra eu testar :)"
  }
  })
    .then((response) => {
      console.log('Mensagem enviada com sucesso:', response.data);
    })
    .catch((error) => {
      console.error('Erro ao enviar a mensagem:', error);
    });
}





