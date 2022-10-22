import fs from "fs"



const base64Prefixo = "data:image/png;base64,";
const logo = `${base64Prefixo}${ fs.readFileSync("app/assets/imgs/logoPDF.png").toString("base64")}`;
const footer = `${base64Prefixo}${ fs.readFileSync("app/assets/imgs/footerPDF.png").toString("base64")}`;

const conteudoPdf = ({nomePaciente, dataNascimento, tituloReceita, descricao}) => `

<div 
    style="    
        width: 265mm;
        height: 357mm;
    ">

    <img  
        style="
            width: 360px;
            position: absolute;
            top: 10px;
            margin-top: 10px;
            left: 8.6cm;
            
        "   
        
        src="${logo}"
    />    
</div>
<div
    style="
        width: 265mm;
        position: absolute;
        top: 5cm;
        margin-top: 50px;

">
    <p style="padding-left: 1.5cm; font-size:22px">Nome do paciente: ${nomePaciente}</p>
    <p style="padding-left: 1.5cm; font-size:22px">Data de nascimento: ${dataNascimento}</p>
    <p style=" font-size:34px; text-align: center;">  ${tituloReceita} </p>
    <p style="padding-left: 1.5cm; margin-right: 1.5cm; font-size:20px; "> ${descricao} </p>                        
</div>
<img 
    style="
        width: 265mm;
        position: absolute;
        top: 325mm;
    "
    src="${footer}"
/>
</div>
`

export default conteudoPdf;