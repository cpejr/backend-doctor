import fs from 'fs'

const base64Prefixo = 'data:image/png;base64,'
const logo = `${base64Prefixo}${fs.readFileSync('app/assets/imgs/logoPDF.png').toString('base64')}`
const footer = `${base64Prefixo}${fs
  .readFileSync('app/assets/imgs/footerPDF.png')
  .toString('base64')}`

const conteudoPdf = ({ nomePaciente, dataNascimento, tituloReceita, descricao }) => `

<div
    style="
    width: 265mm;
    height: 357mm;
    ">

    <img
        style="
            width: 288px;
            position: absolute;
            top: 10px;
            margin-top: 10px;
            left: 7cm;

        "

        src="${logo}"
    />
</div>
<div
    style="
        width: 212mm;
        position: absolute;
        top: 5cm;
        margin-top: 50px;

">
    <p style="padding-left: 1.5cm; font-size:22px;font-family:calibri">Nome do paciente: ${nomePaciente}</p>
    <p style="padding-left: 1.5cm; font-size:22px;font-family:calibri">Data de nascimento: ${dataNascimento}</p>
    <p style=" font-size:34px; text-align: center;font-family:calibri">${tituloReceita} </p>
    <pre style="padding-left: 1.5cm; margin-right: 1.5cm; font-size:20px; font-family:calibri">${descricao}</pre>
</div>
<img
    style="
        width: 212mm;
        position: absolute;
        top: 260mm;
    "
    src="${footer}"
/>
</div>
`

export default conteudoPdf
