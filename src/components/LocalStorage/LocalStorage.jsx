const ClearLocalStorage = (tipo) => {
    localStorage.removeItem(tipo); 
};

const GuardarLocalStorage = (tipo,Objeto) => {
    return localStorage.setItem(tipo, JSON.stringify(Objeto));
}; 

const PedirLocalStorage = (tipo) => {
  const objetoJSON = localStorage.getItem(tipo);

  if (objetoJSON) {
    return JSON.parse(objetoJSON);
  } else {
    // Valor predeterminado o puedes devolver otro valor que consideres apropiado
  }
};

export {GuardarLocalStorage, ClearLocalStorage, PedirLocalStorage};