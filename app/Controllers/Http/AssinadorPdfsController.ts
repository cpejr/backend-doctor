//Teste 2( já está em NodeJs, porém frontend é diferente)
import request from 'request';
import fs from 'fs';
require('dotenv/config');
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
//Biblioteca que o ChatGPT sugeriu.
import got from "got";
// É necessário armazenar o nonce do lote inicializado
// para que seja possível finalizar a assinatura
var nonceSessaoLotePdfInicializado = "0";

var credencial = `${process.env.ACCESS_TOKEN}`;
export default class AssinadorPdfsController{
public async inicializar({ request, response }: HttpContextContract) {
	
  
  console.log(credencial);
  console.log(request);
	let bodyJson = request.body();
    
	let meta = bodyJson.metadados;
    
	console.log(meta);
	// Certificado veio do lado cliente
	let certificado = bodyJson.certificado;

    console.log(certificado);

	// Inicializa assinatura PDF (Server-Framework através do BRy HUB)
	this.inicializarPdf(certificado, meta)
	.then((resultPdf) => {
		// Prepara os dados de entrada para a extensão e envia para o lado cliente
		let input = this.prepararDadosEntradaExtensao(resultPdf);

		response.status(200).send(input);

	})
	.catch((error) => {
		response.status(400).send(error);
	});

}

public  finalizar = ({ request, response }: HttpContextContract) => {
	let resultadoExtensao = request.body();

	let dadosFinalizarPdf;

	// Prepara os dados para finalizar a assinatura
	for (let i = 0; i < resultadoExtensao.assinaturas.length; i++) {
		dadosFinalizarPdf.push({
			"cifrado": resultadoExtensao.assinaturas[i].hashes[0],
			"nonce": resultadoExtensao.assinaturas[i].nonce
		});
	}

	// Finaliza assinatura PDF (Server-Framework através do BRy HUB)
	this.finalizarPdf(dadosFinalizarPdf)
	.then((resultPdf) => {

		// Cria uma estrutura JSON apenas para exibir no textarea no lado cliente
		var input = {
			"PDF": resultPdf
		};

		response.status(200).send(input);

	})
	.catch((error) => {
		response.status(400).send(error);
	});
}

// Esta função prepara os dados para a extensão assinar.
public async prepararDadosEntradaExtensao(resultPDf) {
	// Para mais detalhes sobre os dados de entrada da extensão favor consular a documentação da extensão.  

	console.log(resultPDf);
	console.log("Teste");
	nonceSessaoLotePdfInicializado = resultPDf.nonce;

	let assinaturas = new Array();

	for (let i = 0; i < resultPDf.assinaturasInicializadas.length; i++) {
		assinaturas.push({
			"algoritmoHash": resultPDf.algoritmoHash,
			"nonce": resultPDf.assinaturasInicializadas[i].nonce,
			"hashes": [resultPDf.assinaturasInicializadas[i].messageDigest]
		});
	}

	let input = {        
		"formatoDadosEntrada": "Base64",
		"formatoDadosSaida": "Base64",
		"assinaturas": assinaturas
	};
	
	return JSON.stringify(input);
}

public async inicializarPdf(certificado, meta) {
	var formData = {
		// loop
		'documento': [
			fs.createReadStream("./documento.pdf"),
			fs.createReadStream("./documento.pdf")
		],
		// fim loop
		'imagem': fs.createReadStream("./imagem.jpg"),
		'dados_inicializar': JSON.stringify(
			{
				"perfil": "CARIMBO",
				"algoritmoHash": "SHA256",
				"formatoDadosEntrada": "Base64",
				"formatoDadosSaida": "Base64",
				"certificado": certificado,
				"nonces": ["PDF1","PDF2"]
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
	console.log(options);
   // Comentários, a partir daqui está dando errado, o documento e a imagem estão colocadas fixas, pois estou testando a funcionalidade, no caso está nos documentos que eu mandei, mas tá traquilo
   // Renovei e e criei outros tokens, mas, mesmo assim, não funcionou
	return new Promise((resolve, reject) => {
		request.post(options, (err, res, body) => {
			if (err) {
				console.log(err);
				reject(err);
			}
			else {
				if (res.statusCode == 200) {   
					console.log(body);       
					resolve(body);
				}
				else {
					reject(body);
				}
			}
		});
	});
// Sugestão do Chat GPT 
   /* try {
		const response = await got.post(options)
	
		if (response.statusCode === 200) {
		  console.log(response.body)
		  return response.body
		} else {
		  throw response.body
		}
	  } catch (error) {
		console.log(error)
		throw error
	  }*/


}

public async finalizarPdf(dataFinalizaPdf) {
	let jsonFinalizar = {
		"nonce": nonceSessaoLotePdfInicializado,
		"formatoDeDados": "Base64",
		"assinaturasPkcs1": dataFinalizaPdf
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
				console.log(err);
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