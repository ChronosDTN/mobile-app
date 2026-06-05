// ==========================================================================================
// AXIOS INTERCEPTOR DO FRONT-END EM TYPESCRIPT (CHRONOS DTN)
// SIMULA A LATÊNCIA DA LUZ ENTRE A TERRA E A LUA (1.28 SEGUNDOS OU 1280 MILISSEGUNDOS)
// IMPLEMENTA BLOQUEIO E DUPLA CONFIRMAÇÃO DE EXCLUSÃO DE NÓS COM PACOTES PENDENTES
// ==========================================================================================

// Importa a biblioteca Axios para permitir a criação de instâncias de comunicação HTTP REST.
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
// Importa componentes de exibição de alertas do React Native para obter interação via caixas de diálogo nativas.
import { Alert } from 'react-native';

// Define a constante de tempo da velocidade de ida da luz da Terra à Lua em milissegundos.
const LATENCIA_LUZ_MS = 1280;

// Cria uma instância customizada do Axios configurada com as rotas básicas do ecossistema Chronos DTN.
export const api: AxiosInstance = axios.create({
  // URL base padrão da API Backend configurada para o gateway local.
  baseURL: 'http://192.168.1.100:8080/api',
  // Tempo máximo limite de espera de conexões físicas (Timeout de segurança da requisição).
  timeout: 10000,
});

// Helper de promessa de atraso síncrono que simula a passagem do tempo físico na rede de comunicações.
const atrasoLatencia = (ms: number): Promise<void> => {
  // Retorna uma promessa que resolve após o tempo estipulado em milissegundos.
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// ------------------------------------------------------------------------------------------
// INTERCEPTOR DE REQUISIÇÃO (REQUEST INTERCEPTOR)
// Intercepta todas as saídas de rede antes de saírem do dispositivo móvel do usuário.
// ------------------------------------------------------------------------------------------
api.interceptors.request.use(
  // Função executada antes que a requisição seja enviada pelo protocolo de rede.
  async (config: InternalAxiosRequestConfig) => {
    // Exibe log de telemetria no console informando o disparo com o delay simulado.
    console.log(`[LATENCY-SIM] Enviando requisicao para ${config.url}. Aguardando 1.28s...`);
    
    // Aguarda obrigatoriamente 1280 milissegundos para emular a distância física espacial.
    await atrasoLatencia(LATENCIA_LUZ_MS);
    
    // Se a requisição for de exclusão (DELETE) de um nó de gateway de rede.
    if (config.method === 'delete' && config.url?.includes('/nodes/')) {
      // Extrai o ID do nó da URL que está sendo processada.
      const idNodeStr = config.url.split('/').pop();
      // Converte o ID para número inteiro para consulta local ou remota.
      const idNode = parseInt(idNodeStr || '0', 10);
      
      // Verifica se o nó possui pacotes acumulados em sua partição de memória Flash local.
      const temPacotesPendentesNoBuffer = await verificarFilaPendenteNoBuffer(idNode);
      
      // Se houver pacotes retidos no buffer e a requisição NÃO possuir o cabeçalho de bypass "X-Force-Delete".
      if (temPacotesPendentesNoBuffer && config.headers?.['X-Force-Delete'] !== 'true') {
        
        // Retorna uma promessa que gerencia o fluxo visual do usuário (Bloqueio estrito + Dupla confirmação).
        return new Promise<InternalAxiosRequestConfig>((resolve, reject) => {
          
          // Primeiro Alerta: Bloqueio estrito padrão informando sobre o buffer carregado.
          Alert.alert(
            'Ação Bloqueada pelo Protocolo DTN',
            'Não é possível deletar este nó no modo padrão. Existem pacotes de stablecoins acumulados na memória flash deste gateway.',
            [
              {
                // Opção 1: Cancela a operação e rejeita a requisição imediatamente (Mantém o nó seguro).
                text: 'OK (Manter Nó)',
                style: 'cancel',
                onPress: () => reject(new Error('Exclusao cancelada: Bloqueio de segurança do buffer ativo.'))
              },
              {
                // Opção 2: Direciona para a alternativa de desvio com dupla confirmação e aviso de perdas.
                text: 'Forçar Exclusão',
                style: 'destructive',
                onPress: () => {
                  
                  // Segundo Alerta: Confirmação de impacto financeiro (Descarte irreversível).
                  Alert.alert(
                    '⚠️ AVISO DE IMPACTO CRÍTICO',
                    'CUIDADO: Forçar a exclusão apagará o nó e DESCARTARÁ PERMANENTEMENTE todos os pacotes retidos no buffer sem liquidação física. Tem certeza?',
                    [
                      {
                        // Opção de desistência na segunda tela.
                        text: 'Abortar',
                        style: 'cancel',
                        onPress: () => reject(new Error('Exclusao cancelada pelo operador no segundo aviso.'))
                      },
                      {
                        // Opção final que confirma o desvio técnico.
                        text: 'Sim, Descartar e Deletar',
                        style: 'destructive',
                        onPress: () => {
                          // Adiciona dinamicamente o cabeçalho que sinaliza a permissão de bypass ao backend.
                          config.headers['X-Force-Delete'] = 'true';
                          // Resolve a promessa permitindo a liberação física da requisição DELETE.
                          resolve(config);
                        }
                      }
                    ]
                  );
                }
              }
            ]
          );
        });
      }
    }
    
    // Retorna a configuração modificada da requisição para seguir seu tráfego normal na rede.
    return config;
  },
  // Função de tratamento caso ocorra algum erro na interceptação de saída da requisição.
  (error: AxiosError) => {
    // Propaga o erro gerado na interceptação para tratamento no componente de tela.
    return Promise.reject(error);
  }
);

// ------------------------------------------------------------------------------------------
// INTERCEPTOR DE RESPOSTA (RESPONSE INTERCEPTOR)
// Intercepta e simula o tempo de volta do sinal luminoso lunar e trata erros de sincronização.
// ------------------------------------------------------------------------------------------
api.interceptors.response.use(
  // Função executada no recebimento de status codes da família 2xx do servidor.
  async (response: AxiosResponse) => {
    // Exibe log informando o recebimento da resposta e o início do delay do sinal de volta da Lua.
    console.log(`[LATENCY-SIM] Resposta recebida do servidor. Aguardando 1.28s de retorno de sinal...`);
    
    // Aguarda o tempo físico de retorno da transmissão espacial (velocidade da luz).
    await atrasoLatencia(LATENCIA_LUZ_MS);
    
    // Retorna o objeto de resposta original contendo os dados do payload JSON limpos.
    return response;
  },
  // Função executada quando o servidor responde com erros de status code (ex: 4xx, 5xx).
  async (error: AxiosError) => {
    // Aguarda o tempo físico de retorno do sinal de erro para consistência da UI.
    await atrasoLatencia(LATENCIA_LUZ_MS);
    
    // Captura e formata a mensagem de erro específica vinda do servidor ou do interceptor local.
    const mensagemErro = error.response
      ? `Erro do Servidor Lunar [${error.response.status}]: ${JSON.stringify(error.response.data)}`
      : `Falha na rede espacial ou bloqueio de sincronismo: ${error.message}`;
      
    // Exibe o alerta no console interno para monitoramento de depuração.
    console.error(`[DTN-ERROR] ${mensagemErro}`);
    
    // Retorna a promessa rejeitada repassando a estrutura de erro para tratamento na UI.
    return Promise.reject(error);
  }
);

// ------------------------------------------------------------------------------------------
// FUNÇÃO AUXILIAR DE SIMULAÇÃO DE ESTADO DO BUFFER
// ------------------------------------------------------------------------------------------
// Função mockada de verificação de integridade física e pacotes acumulados de rede.
async function verificarFilaPendenteNoBuffer(idNode: number): Promise<boolean> {
  // Retorna uma promessa que resolve simulando uma checagem rápida no buffer local.
  return new Promise((resolve) => {
    // Se o nó de rede consultado for o ID número 3, simula que ele possui pacotes pendentes.
    if (idNode === 3) {
      // Resolve com verdadeiro indicando que a exclusão é proibida por segurança padrão.
      resolve(true);
    } else {
      // Resolve com falso indicando que a exclusão está liberada operacionalmente.
      resolve(false);
    }
  });
}
