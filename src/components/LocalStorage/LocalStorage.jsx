import { useEffect } from "react";

const ClearLocalStorage = (tipo) => {
  localStorage.removeItem(tipo);
};

const GuardarLocalStorage = (tipo, Objeto) => {
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

const TokenExpiration = () => {
  useEffect(() => {
    const checkExpiration = () => {
      const loginTime = PedirLocalStorage('time'); // Obtiene el tiempo de inicio de sesión
      const currentTime = Date.now(); // Tiempo actual

      // Cálculo de tiempo transcurrido (en milisegundos)
      const timeElapsed = currentTime - loginTime;

      // Tiempo límite (3 horas en milisegundos)
      const expirationTime = 3 * 60 * 60 * 1000;

      if (timeElapsed >= expirationTime) {
        ClearLocalStorage('token'); // Elimina el token si ha pasado el tiempo
        ClearLocalStorage('time');  // Limpia también el tiempo
        alert("La sesión ha expirado. Por favor, inicia sesión de nuevo.");
        window.location.href = "/login"; // Redirige al login
      }
    };

    // Verificación inicial
    checkExpiration();

    // Verifica cada minuto si la sesión ha expirado
    const interval = setInterval(() => {
      checkExpiration();
    }, 60 * 1000); // 60 segundos

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return null; // No es necesario renderizar nada
};

export { GuardarLocalStorage, ClearLocalStorage, PedirLocalStorage, TokenExpiration };