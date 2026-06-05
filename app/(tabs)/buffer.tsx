// ==========================================================================================
// TELA DE MONITORAMENTO DO BUFFER DTN - TEMA VOID PROTOCOL (CHRONOS DTN MOBILE)
// FILA DE PACOTES DE STABLECOINS PENDENTES COM FONTES GOOGLE E CORES DA IMAGEM 1
// ==========================================================================================

// Importa hooks do React Core de estado e ciclo de vida.
import React, { useState, useEffect } from 'react';
// Importa componentes visuais, de layout e interativos do React Native.
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
// Importa o conjunto de ícones vetoriais da Expo.
import { Ionicons } from '@expo/vector-icons';
// Importa as cores da paleta Void Protocol.
import { COLORS } from '../../constants/Colors';

// Interface de tipagem estrutural do pacote contido na fila do buffer.
interface TransacaoBuffer {
  // Identificador único da transação financeira.
  id: string;
  // Símbolo do token stablecoin (USDC, USDT, etc).
  token: string;
  // Valor monetário transferido.
  valor: number;
  // Timestamp local no fuso horário da Lua.
  timestampLuna: string;
  // Status atual de retransmissão do pacote.
  status: string;
}

// Componente principal correspondente à tela do Buffer.
export default function BufferScreen() {
  // Controla se o aplicativo está buscando dados locais em flash.
  const [carregando, setCarregando] = useState(true);
  // Estado local contendo a fila de pacotes pendentes.
  const [fila, setFila] = useState<TransacaoBuffer[]>([]);

  // Efeito disparado na inicialização simulando a latência do hardware cislunar.
  useEffect(() => {
    const timer = setTimeout(() => {
      const dadosBuffer: TransacaoBuffer[] = [
        { id: 'TX-9021', token: 'USDC', valor: 250.00, timestampLuna: '2026-06-02T22:40:01Z', status: 'PENDING' },
        { id: 'TX-9022', token: 'USDT', valor: 1500.00, timestampLuna: '2026-06-02T22:42:15Z', status: 'PENDING' },
        { id: 'TX-9023', token: 'USDC', valor: 90.00, timestampLuna: '2026-06-02T22:44:30Z', status: 'PENDING' }
      ];
      setFila(dadosBuffer);
      setCarregando(false);
    }, 1280);
    return () => clearTimeout(timer);
  }, []);

  // Despacha em rajada todas as transações acumuladas na fila local.
  const forcarUploadLote = () => {
    Alert.alert(
      'Uplink DTN Iniciado',
      'Despachando pacotes do buffer físico via rajada de rádio para o Orbiter 1...',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            setFila([]);
            Alert.alert('Fila Limpa', 'Todos os pacotes de stablecoins foram transmitidos e gravados na base Terra.');
          }
        }
      ]
    );
  };

  // Se a tela estiver carregando.
  if (carregando) {
    return (
      <View style={styles.containerCentro}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.textoLoading}>Buscando registros na memoria flash...</Text>
      </View>
    );
  }

  // Renderiza a interface final do buffer.
  return (
    <View style={styles.containerPrincipal}>
      
      {/* Ponto de brilho superior esquerdo. */}
      <View style={styles.glowSpotSilver1} />
      {/* Ponto de brilho inferior direito. */}
      <View style={styles.glowSpotSilver2} />

      {/* Rolagem da tela. */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        
        {/* Container horizontal com ícone vetorial do título integrado. */}
        <View style={styles.rowTituloTela}>
          <Ionicons name="file-tray-full-outline" size={24} color={COLORS.textPrimary} style={styles.iconTitulo} />
          <Text style={styles.screenTitle}>BUFFER DTN</Text>
        </View>

        {/* Caixa informativa explicativa com borda macia de 12px. */}
        <View style={styles.cardInfo}>
          <Text style={styles.tituloInfo}>FILA STORE-AND-FORWARD CISLUNAR</Text>
          <Text style={styles.textoInfo}>
            Estas transações financeiras estão enfileiradas na memória flash local e serão retransmitidas
            automaticamente assim que houver visada ativa de comunicação.
          </Text>
        </View>

        {/* Botão de envio forçado da rajada em lote (Pílula em Ion Blue). */}
        <TouchableOpacity 
          style={styles.botaoSinc}
          onPress={forcarUploadLote}
        >
          <View style={styles.rowBotaoConteudo}>
            <Ionicons name="cloud-upload-outline" size={14} color="#000000" style={styles.iconBotao} />
            <Text style={styles.textoBotaoSinc}>TRANSMITIR LOTE ACUMULADO</Text>
          </View>
        </TouchableOpacity>

        {/* Rótulo técnico contendo a contagem. */}
        <Text style={styles.secaoTitulo}>FILA ATIVA ({fila.length} PACOTES)</Text>

        {/* Listagem de itens. */}
        {fila.length === 0 ? (
          <View style={styles.cardFilaVazia}>
            <Text style={styles.textoFilaVazia}>Fila zerada. Todos os pacotes foram transmitidos.</Text>
          </View>
        ) : (
          fila.map((pacote) => (
            <View key={pacote.id} style={styles.cardPacote}>
              <View style={styles.rowInfoEsquerda}>
                <Ionicons name="cube-outline" size={16} color={COLORS.textSecondary} style={styles.iconPacote} />
                <View>
                  <Text style={styles.idPacote}>{pacote.id}</Text>
                  <Text style={styles.dataPacote}>Luna: {pacote.timestampLuna}</Text>
                </View>
              </View>
              <View style={styles.colValor}>
                <Text style={styles.valorPacote}>{pacote.valor.toFixed(2)} {pacote.token}</Text>
                {/* Status em ouro cósmico. */}
                <Text style={styles.statusPacote}>{pacote.status}</Text>
              </View>
            </View>
          ))
        )}

      </ScrollView>
    </View>
  ); // Fim da renderização.
} // Fim da classe BufferScreen.

// Estilos de visualização CSS para o Buffer.
const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: COLORS.background, // Void Black.
    position: 'relative',
  },
  glowSpotSilver1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    top: 50,
    left: -80,
    backgroundColor: COLORS.glowPurple,
  },
  glowSpotSilver2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    top: 250,
    right: -100,
    backgroundColor: COLORS.glowPurple,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 50,
    paddingBottom: 90,
  },
  rowTituloTela: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconTitulo: {
    marginRight: 10,
  },
  containerCentro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  textoLoading: {
    color: COLORS.textSecondary,
    fontFamily: 'DMSans-Regular',
    marginTop: 15,
    fontSize: 12,
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: 'Syne-Bold',
    color: COLORS.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  cardInfo: {
    backgroundColor: COLORS.glassSurface,
    borderRadius: 12, // Cantos arredondados de 12px.
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    marginBottom: 20,
  },
  tituloInfo: {
    fontSize: 11,
    fontFamily: 'DMSans-Bold',
    color: COLORS.textPrimary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  textoInfo: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  botaoSinc: {
    backgroundColor: COLORS.accent, // Ion Blue.
    padding: 16,
    borderRadius: 30, // Pílula.
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  rowBotaoConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBotao: {
    marginRight: 6,
  },
  textoBotaoSinc: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'DMSans-Bold',
    letterSpacing: 1,
  },
  secaoTitulo: {
    color: COLORS.textPrimary,
    fontFamily: 'DMSans-Bold',
    fontSize: 14,
    marginBottom: 15,
  },
  cardFilaVazia: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textoFilaVazia: {
    color: COLORS.textPrimary,
    fontFamily: 'DMSans-Bold',
    fontSize: 12,
  },
  cardPacote: {
    backgroundColor: COLORS.glassSurface,
    padding: 20,
    borderRadius: 12, // Cantos arredondados de 12px.
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  rowInfoEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPacote: {
    marginRight: 10,
  },
  idPacote: {
    color: COLORS.textPrimary,
    fontFamily: 'DMSans-Bold',
    fontSize: 13,
  },
  dataPacote: {
    color: COLORS.textSecondary,
    fontFamily: 'DMSans-Regular',
    fontSize: 11,
    marginTop: 4,
  },
  colValor: {
    alignItems: 'flex-end',
  },
  valorPacote: {
    color: COLORS.textPrimary,
    fontFamily: 'DMSans-Bold',
    fontSize: 13,
  },
  statusPacote: {
    color: COLORS.gold, // Status pendente em ouro.
    fontFamily: 'DMSans-Bold',
    fontSize: 10,
    marginTop: 4,
  },
});
