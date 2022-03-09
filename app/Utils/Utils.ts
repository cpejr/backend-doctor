export function limpaCamposNulosDeObjeto(objetoSujo: Object):Object {
    const chaves = Object.keys(objetoSujo)
    let objetoLimpo = {}
    chaves.forEach((chave) => {
      if (objetoSujo[chave] !== undefined && objetoSujo[chave] !== null ) {
        objetoLimpo[chave] = objetoSujo[chave]
      }
    })
    console.log(objetoLimpo)
    return objetoLimpo
}