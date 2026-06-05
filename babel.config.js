// ==========================================================================================
// ARQUIVO DE CONFIGURAÇÃO DO BABEL (CHRONOS DTN MOBILE)
// DEFINE OS COMPILADORES E TRANSPLILADORES DE CÓDIGO JAVASCRIPT/TYPESCRIPT DO EXPO
// ==========================================================================================

// Define a exportação padrão do módulo contendo as configurações de compilação da API do Babel.
module.exports = function (api) {
  // Ativa o cache automático das configurações de compilação para acelerar reinicializações da CLI.
  api.cache(true);
  
  // Retorna o objeto de configurações de presets que o Babel usará no transpiler.
  return {
    // Especifica o uso do preset oficial do Expo para suporte a React Native, JSX e TypeScript.
    presets: ['babel-preset-expo'],
  };
};
