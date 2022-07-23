export function limpaCamposNulosDeObjeto(objetoSujo: Object):Object {
    const chaves = Object.keys(objetoSujo)
    let objetoLimpo = {}
    chaves.forEach((chave) => {
      if (objetoSujo[chave] !== undefined ) {
        objetoLimpo[chave] = objetoSujo[chave]
      }
    })


    return objetoLimpo
}
