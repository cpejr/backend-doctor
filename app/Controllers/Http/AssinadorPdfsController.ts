//Teste 2( já está em NodeJs, porém frontend é diferente)
import request from 'request';
import fs from 'fs';
import FormData from 'form-data';
import { Readable } from 'stream';
require('dotenv/config');
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ArquivosController from 'App/Controllers/Http/ArquivosController'

//Biblioteca que o ChatGPT sugeriu.
import got from "got";
// É necessário armazenar o nonce do lote inicializado
// para que seja possível finalizar a assinatura
var nonceSessaoLotePdfInicializado = "0";
var credencial = `${process.env.ACCESS_TOKEN}`;
export default class AssinadorPdfsController {
	public async inicializar({ request, response }: HttpContextContract) {

		let bodyJson = request.body();
		let meta = bodyJson.metadados;
		const arquivoscontroller: ArquivosController = new ArquivosController();

		const nomePaciente = meta.documento.NomePaciente
		const dataNascimento = meta.documento.dataNascimentoPaciente
		const titulo = meta.documento.tituloReceita
		const descricao = meta.documento.descricaoReceita


		



		const arquivoPdfReceita = await arquivoscontroller.criaPDFReceita(nomePaciente, dataNascimento, titulo, descricao);
		console.log(arquivoPdfReceita);


		// Certificado veio do lado cliente
		let documento = arquivoPdfReceita;
		
		let certificado = bodyJson.certificado;

	
		delete meta.documento;


		// Inicializa assinatura PDF (Server-Framework através do BRy HUB)
		const resultPdf = await this.inicializarPdf(certificado, meta, documento);
		// Prepara os dados de entrada para a extensão e envia para o lado cliente
		let respostaInicializar = await this.prepararDadosEntradaExtensao(resultPdf);
		/* console.log(respostaInicializar); */
		return respostaInicializar;
		/* response.status(200).send(respostaInicializar); */

	}

	public async finalizar({ request, response }: HttpContextContract) {
		let resultadoExtensao = request.body();
		let dadosFinalizarPdf = new Array();
		// Prepara os dados para finalizar a assinatura
		dadosFinalizarPdf.push({
			"cifrado": resultadoExtensao.assinaturas[0].hashes[0],
			"nonce": resultadoExtensao.assinaturas[0].nonce
		});


		// Finaliza assinatura PDF (Server-Framework através do BRy HUB)
		const resultPdf = await this.finalizarPdf(dadosFinalizarPdf);
		// Cria uma estrutura JSON apenas para exibir no textarea no lado cliente
		var input = {
			"PDF": resultPdf
		};
		return input;
		response.status(200).send(input);


	}

	// Esta função prepara os dados para a extensão assinar.
	public async prepararDadosEntradaExtensao(resultPDf) {
		// Para mais detalhes sobre os dados de entrada da extensão favor consular a documentação da extensão.  
		let resultadoPDF = JSON.parse(resultPDf)
		nonceSessaoLotePdfInicializado = resultadoPDF.nonce;

		let assinaturaobjeto = resultadoPDF.assinaturasInicializadas;
		let assinaturas = new Array();

		assinaturas.push({
			"algoritmoHash": resultadoPDF.algoritmoHash,
			"nonce": resultadoPDF.assinaturasInicializadas[0].nonce,
			"hashes": [resultadoPDF.assinaturasInicializadas[0].messageDigest]
		});


		let input = {
			"formatoDadosEntrada": "Base64",
			"formatoDadosSaida": "Base64",
			"assinaturas": assinaturas
		};

		return JSON.stringify(input);
	}

	public async inicializarPdf(certificado, meta, documento) {

		console.log(meta);


		fs.writeFileSync('documento3.pdf', documento);

		
		var formData = {
			// loop
			'documento': 
				fs.createReadStream('documento3.pdf')
			,
			// fim loop
			'imagem': fs.createReadStream("./imagem.jpg"),
			'dados_inicializar': JSON.stringify(
				{
					"perfil": "CARIMBO",
					"algoritmoHash": "SHA256",
					"formatoDadosEntrada": "Base64",
					"formatoDadosSaida": "Base64",
					"certificado": certificado,
					"nonces": ["PDF1"]
				}
			),
			'configuracao_imagem': JSON.stringify(
				{
					"altura": 60,
					"largura": 170,
					"posicao": "INFERIOR_ESQUERDO",
					"pagina": "PRIMEIRA"
				}
			),
			'metadados': JSON.stringify(meta)
		};

		const options = {
			method: "POST",
			url: `https://${process.env.URL_HUB}/fw/v1/pdf/pkcs1/assinaturas/acoes/inicializar`,
			port: 443,
			headers: {
				"Authorization": credencial,
				"Content-Type": "multipart/form-data"
			},
			formData: formData
		};
		// Comentários, a partir daqui está dando errado, o documento e a imagem estão colocadas fixas, pois estou testando a funcionalidade, no caso está nos documentos que eu mandei, mas tá traquilo
		// Renovei e e criei outros tokens, mas, mesmo assim, não funcionou
		return new Promise((resolve, reject) => {
			request.post(options, (err, res, body) => {
				if (err) {
					reject(err);
				}
				else {
					if (res.statusCode == 200) {
						resolve(body);
					}
					else {
						reject(body);
					}
				}
			});
		});



	}

	public async finalizarPdf(dataFinalizaPdf) {
		var jsonFinalizar = {
			"nonce": nonceSessaoLotePdfInicializado,
			"formatoDeDados": "Base64",
			"assinaturasPkcs1": dataFinalizaPdf,
			"tipoRetorno": "BASE64"
		};
		const options = {
			method: "POST",
			url: `https://${process.env.URL_HUB}/fw/v1/pdf/pkcs1/assinaturas/acoes/finalizar`,
			port: 443,
			headers: {
				"Authorization": credencial,
				"Content-Type": "application/json"
			},
			json: jsonFinalizar
		};

		return new Promise((resolve, reject) => {
			request.post(options, (err, res, body) => {
				if (err) {
					reject(err);
				}
				else {
					if (res.statusCode == 200) {
						resolve(body);
					}
					else {
						reject(body);
					}
				}
			});
		});
	}

	public async objToBase64(data) {
		// Função não otimizada, para fins de exemplo
		let buff = Buffer.from(data);
		return buff.toString('base64');
	}

}