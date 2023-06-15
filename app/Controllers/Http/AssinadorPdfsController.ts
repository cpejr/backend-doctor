import request from 'request';
import fs from 'fs';

require('dotenv/config');
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ArquivosController from 'App/Controllers/Http/ArquivosController'


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


		let documento = arquivoPdfReceita;
		
		let certificado = bodyJson.certificado;

	
		delete meta.documento;


		const resultPdf = await this.inicializarPdf(certificado, meta, documento);
		let respostaInicializar = await this.prepararDadosEntradaExtensao(resultPdf);
		return respostaInicializar;

	}

	public async finalizar({ request, response }: HttpContextContract) {
		let resultadoExtensao = request.body();
		let dadosFinalizarPdf = new Array();
		dadosFinalizarPdf.push({
			"cifrado": resultadoExtensao.assinaturas[0].hashes[0],
			"nonce": resultadoExtensao.assinaturas[0].nonce
		});


		const resultPdf = await this.finalizarPdf(dadosFinalizarPdf);
		var input = {
			"PDF": resultPdf
		};
		return input;
		response.status(200).send(input);


	}

	public async prepararDadosEntradaExtensao(resultPDf) {
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



		fs.writeFileSync('documento3.pdf', documento);

		
		var formData = {
			
			'documento': 
				fs.createReadStream('documento3.pdf')
			,
			
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

	

}