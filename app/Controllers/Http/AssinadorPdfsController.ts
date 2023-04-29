//Teste 2( já está em NodeJs, porém frontend é diferente)
import request from 'request';
import fs from 'fs';
import FormData from 'form-data';
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
    console.log(bodyJson);
	let meta = bodyJson.metadados;
    
	console.log(meta);
	// Certificado veio do lado cliente
	let certificado = bodyJson.certificado;

    console.log(certificado);
    let respostaInicializar = {}
	// Inicializa assinatura PDF (Server-Framework através do BRy HUB)
	this.inicializarPdf(certificado, meta)
	.then((resultPdf) => {
		// Prepara os dados de entrada para a extensão e envia para o lado cliente
		console.log(resultPdf);
		let input = this.prepararDadosEntradaExtensao(resultPdf);
		console.log("teste2");
        console.log(input);
		respostaInicializar = input;
		console.log(respostaInicializar);
		//response.status(200).send(input);
        return respostaInicializar;
	})
	.catch((error) => {
		response.status(400).send(error);
	});
	
}

public  finalizar = ({ request, response }: HttpContextContract) => {
	let resultadoExtensao = request.body();
	 console.log("Teste3");
     console.log(resultadoExtensao);
	let dadosFinalizarPdf;

	// Prepara os dados para finalizar a assinatura
		dadosFinalizarPdf.push({
			"cifrado": resultadoExtensao.assinaturas[0].hashes[0],
			"nonce": resultadoExtensao.assinaturas[0].nonce
		});
	

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
    console.log("Teste");
	console.log(JSON.parse(resultPDf) );
	let resultadoPDF = JSON.parse(resultPDf)
	nonceSessaoLotePdfInicializado = resultadoPDF.nonce;
    
	console.log( nonceSessaoLotePdfInicializado);
	let assinaturaobjeto = resultadoPDF.assinaturasInicializadas;
	console.log(assinaturaobjeto[0].nonce);
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
	console.log("Teste1");
	console.log(input.assinaturas);
	
	return JSON.stringify(input);
}

public async inicializarPdf(certificado, meta) {
	var formData = {
		// loop
		'documento': [
			fs.createReadStream("./documento.pdf"),
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
					console.log(body);
					reject(body);
				}
			}
		});
	});



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