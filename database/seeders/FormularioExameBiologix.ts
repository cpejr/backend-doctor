import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Formulario from 'App/Models/Formulario'


const perguntasBiologix: any = {
  type: 'object',
  properties: {
    newInput1: {
      title: "\n\nAproximadamente que horário você acordaria se estivesse inteiramente livre para planejar seu dia?",
      type: "string",
      enum: ["05:00-06:30 h", "06:30-07:45 h", "07:45-09:45 h", "09:45-11:00 h", "11:00-12:00 h"],
    },
    newInput2: {
      title: "\n\nAproximadamente em que horário você iria deitar caso estivesse inteiramente livre para planejar sua noite?",
      type: "string",
      enum: ["20:00-21:00 h", "21:00-22:15 h", "22:15-00:30 h", "00:30-01:45 h", "01:45-03:00 h"],
    },
    newInput3: {
      title: "\n\nCaso você usualmente tenha que acordar em um horário especifico pela manhã, quanto você depende de um alarme?",
      type: "string",
      enum: ["Nem um pouco", "Razoavelmente", "Moderadamente", "Bastante"],
    },
    newInput4: {
      title: "\n\nQuão facil você acha que é para acordar pela manhã (quando você não é despertado inesperadamente)?",
      type: "string",
      enum: ["Muito difícil", "Razoavelmente difícil", "Razoavelmente fácil", "Muito fácil"],
    },
    newInput5: {
      title: "\n\nQuão alerta você se sente durante a primeira meia hora depois que você acorda pela manhã?",
      type: "string",
      enum: ["Nem um pouco alerta", "Razoavelmente alerta", "Moderadamente alerta", "Muito alerta"],
    },
    newInput6: {
      title: "\n\nQuanta fome você sente durante a primeira meia hora depois que você acorda?",
      type: "string",
      enum: ["Nem um pouco faminto", "Razoavelmente faminto", "Moderadamente faminto", "Muito faminto"],
    },
    newInput7: {
      title: "\n\nDurante a primeira meia hora depois que você acorda pela manhã, como você se sente?",
      type: "string",
      enum: ["Muito cansado", "Razoavelmente cansado", "Moderadamente desperto", "Muito desperto"],
    },
    newInput8: {
      title: "\n\nCaso você não tenha compromissos no dia seguinte, em que horário você iria deitar comparado com seu horário de dormir usual?",
      type: "string",
      enum: ["Raramente ou nunca mais tarde", "Menos que 1 hora mais tarde", "1-2 horas mais tarde", "Mais de 2 horas mais tarde"],
    },
    newInput9: {
      title: "\n\nVocê decidiu fazer atividade fisica. Um amigo sugere que faça isso por uma hora duas vezes por semana, e o melhor horário para ele é entre 7-8hs. Tendo em mente nada a não ser seu próprio “relógio” interno, como você acha que seria seu desempenho?",
      type: "string",
      enum: ["Estaria em boa forma", "Estaria razoavelmente em forma", "Acharia difícil", "Acharia muito difícil"],
    },
    newInput10: {
      title: "\n\nEm aproximadamente que horário da noite você se sente cansado, e, como resultado, necessitando de sono?",
      type: "string",
      enum: ["20:00-21:00 h", "21:00-22:15 h", "22:15-00:45 h", "00:45-02:00 h", "02:00-03:00 h"],
    },
    newInput11: {
      title: "\n\nVocê quer estar no seu melhor desempenho para um teste que você sabe quer sera mentalmente exaustivo e durará duas horas. Você esta inteiramente livre para planejar seu dia. Considerando apenas seu “relógio” interno, qual desses quatro horários de teste você escolheria?",
      type: "string",
      enum: ["08-10 h", "11-13 h", "15-17 h", "19-21 h"],
    },
    newInput12: {
      title: "\n\nCaso você tivesse que se deitar as 23:00hs, quão cansado você estaria?",
      type: "string",
      enum: ["Nem um pouco cansado", "Um pouco cansado", "Moderadadmente cansado", "Muito cansado"],
    },
    newInput13: {
      title: "\n\nPor alguma razão, você se deitou na cama varias horas depois que o usual, mas não hà necessidade para acordar em um horário especifico na manhã seguinte. Qual dos seguintes você mais provavelmente faria?",
      type: "string",
      enum: ["Acordarei no horário usual, mas não voltaria a dormir", "Acordarei no horário usual e depois iria cochilar", "Acordarei no horário usual, mas iria voltar a dormir", "Não acordaria até mais tarde que o usual"],
    },
    newInput14: {
      title: "\n\nEm uma noite, você tem de ficar acordado entre as 04:00-06:00hs, para realizar um plantão noturno. Você não tem compromissos com horários no dia seguinte. Qual das alternativas melhor se adequaria para você?",
      type: "string",
      enum: ["Não iria para cama até o plantão ter terminado", "Teria um cochilo antes e dormiria depois", "Teria um bom sono antes e um cochilo depois", "Dormiria somente antes do plantão"],
    },
    newInput15: {
      title: "\n\nVocê tem duas horas de atividade fisica pesada. Você esta inteiramente livre para planejar seu dia. Considerando apenas seu “relógio” interno, qual dos seguintes horários você iria escolher?",
      type: "string",
      enum: ["08-10 h", "11-13 h", "15-17 h", "19-21 h"],
    },
    newInput16: {
      title: "\n\nVocê decidiu fazer atividade fisica. Uma amiga sugere que faça isso por uma hora duas vezes por semana, e o melhor horário para ela é entre 22:00- 23:00hs. Tendo em mente apenas seu próprio “relógio” interno, como você acha que seria seu desempenho?",
      type: "string",
      enum: ["Estaria em boa forma", "Estaria razoavelmente em forma", "Acharia difícil", "Acharia muito difícil"],
    },
    newInput17: {
      title: "\n\nSuponha que você possa escolher seus próprios horários de trabalho. Assuma que você trabalha um dia de cinco horas (incluindo intervalos), seu trabalho é interessante e você é pago baseado no seu desempenho. Em aproximadamente que horário você escolheria começar?",
      type: "string",
      enum: ["5 horas começando entre 05-08 h", "5 horas começando entre 08-09 h", "5 horas começando entre 09-14 h", "5 horas começando entre 14-17 h", "5 horas começando entre 17-04 h"],
    },
    newInput18: {
      title: "\n\nEm aproximadamente que horário do dia você se sente no seu melhor?",
      type: "string",
      enum: ["05-08 h", "08-10 h", "10-17 h", "17-22 h", "22-05 h h"],
    },
    newInput19: {
      title: "\n\nEm uma escuta sobre “tipos matutinos” e “tipos vespertinos”, qual desses tipos você se considera sendo?",
      type: "string",
      enum: ["Definitivamente um tipo matutino", "Mais um tipo matutino que um tipo vespertino", "Mais um tipo vespertino que um tipo matutino", "Definitivamente um tipo vespertino"],
    },
    newInput20: {
      title: "\n\nMesmo que não tenha feito/passado por alguma dessas situações ultimamente, tente imaginar como é que elas o afetariam na sua sonolência:\n\nUse a escala que se segue para escolher a resposta das próximas perguntas:\n\n-Nenhuma probabilidade de pegar no sono,\n-Pequena probabilidade de pegar no sono,\n-Moderada probabilidade de pegar no sono,\n-Forte probabilidade de pegar no sono.\n\nSentado lendo um livro:",
      type: "string",
      enum: ["Nenhuma", "Pequena", "Moderada", "Forte"],
    },
    newInput21: {
      title: "\n\nSentado vendo televisão:",
      type: "string",
      enum: ["Nenhuma", "Pequena", "Moderada", "Forte"],
    },
    newInput22: {
      title: "\n\nSentado inativo em lugar público (por exemplo, sala de espera, cinema ou reunião):",
      type: "string",
      enum: ["Nenhuma", "Pequena", "Moderada", "Forte"],
    },
    newInput23: {
      title: "\n\nComo passageiro num carro durante uma hora sem paragem:",
      type: "string",
      enum: ["Nenhuma", "Pequena", "Moderada", "Forte"],
    },
    newInput24: {
      title: "\n\nDeitado descansando à tarde quando as circunstâncias permitem:",
      type: "string",
      enum: ["Nenhuma", "Pequena", "Moderada", "Forte"],
    },
    newInput25: {
      title: "\n\nSentado conversando com alguém:",
      type: "string",
      enum: ["Nenhuma", "Pequena", "Moderada", "Forte"],
    },
    newInput26: {
      title: "\n\nSentado calmamente após um almoço sem ter bebido álcool:",
      type: "string",
      enum: ["Nenhuma", "Pequena", "Moderada", "Forte"],
    },
    newInput27: {
      title: "\n\nAo volante parado no transito durante alguns minutos:",
      type: "string",
      enum: ["Nenhuma", "Pequena", "Moderada", "Forte"],
    },
  },
  dependencies: {},
  required: []
}




export default class FormularioExameBiologixSeeder extends BaseSeeder {

  

  public static developmentOnly = true
  public async run () {
    await Formulario.create(
      {
        id: "2abdb136-fa40-439b-b03d-f17e23b3492e",
        titulo: 'Formulario Exame Biologix',
        tipo: 'exame_biologix',
        finalidade: 'Monitorar o sono do paciente',
        perguntas: perguntasBiologix,
        urgencia: 3,
        visualizacao_secretaria: false
    },
    )
  }
}