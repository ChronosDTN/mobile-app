// ==========================================================================================
// TELA DE POUSO / SPLASH PAGE - TEMA VOID PROTOCOL (CHRONOS DTN MOBILE)
// INTERFACE INDIGO SOVEREIGN BASEADA NAS CORES E DIRETRIZES DA IMAGEM 2 E FONTE SYNE
// ==========================================================================================

// Importa hooks de tempo, referências e animação do React Core.
import React, { useEffect, useRef } from 'react';
// Importa componentes visuais e interativos do React Native.
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated } from 'react-native';
// Importa o componente oficial de gradiente linear do Expo.
import { LinearGradient } from 'expo-linear-gradient';
// Importa o conjunto de ícones vetoriais da Expo.
import { Ionicons } from '@expo/vector-icons';
// Importa a navegação baseada em rotas do expo-router.
import { useRouter } from 'expo-router';
// Importa as constantes de cores da paleta Void Protocol.
import { COLORS } from '../constants/Colors';

// Componente principal correspondente à Splash Screen.
export default function SplashPage() {
  // Inicializa o roteador para transição de telas.
  const router = useRouter();

  // Valor animado para a opacidade suave de entrada dos títulos e órbitas.
  const entradaOpacidade = useRef(new Animated.Value(0)).current;
  // Valor animado para o pulsar constante do LED ciano (satélite orbital).
  const opacidadeLed = useRef(new Animated.Value(0.4)).current;
  // Valor animado para a microanimação de escala do botão principal.
  const escalaBotao = useRef(new Animated.Value(1)).current;

  // Efeito disparado na inicialização para carregar as animações de entrada e looping.
  useEffect(() => {
    // Transiciona a opacidade de entrada de 0 para 1 em 1200ms.
    Animated.timing(entradaOpacidade, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Inicia um loop infinito para o LED do satélite pulsar.
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacidadeLed, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacidadeLed, { toValue: 0.4, duration: 800, useNativeDriver: true })
      ])
    ).start();
  }, []);

  // Microanimação de escala ao pressionar o botão.
  const handlePressIn = () => {
    Animated.timing(escalaBotao, { toValue: 0.96, duration: 100, useNativeDriver: true }).start();
  };

  // Microanimação de escala ao soltar o botão.
  const handlePressOut = () => {
    Animated.spring(escalaBotao, { toValue: 1, friction: 5, useNativeDriver: true }).start();
  };

  // Redireciona de forma definitiva para o grupo de abas (Dashboard Home).
  const iniciarConexao = () => {
    router.replace('/(tabs)');
  };

  return (
    // Fundo Void Black idêntico à página Home.
    <View style={styles.containerPrincipal}>
      
      {/* PONTOS DE GLOW AZUL DE FUNDO PARA IMERSÃO ESPACIAL */}
      <View style={styles.glowSpotTop} />
      <View style={styles.glowSpotBottom} />

      {/* ÁREA CENTRAL DAS ÓRBITAS CONCÊNTRICAS */}
      <Animated.View style={[styles.contentCenter, { opacity: entradaOpacidade }]}>
        
        {/* Órbita Externa (Grande) */}
        <View style={[styles.orbitaRing, styles.orbitaRingGrande]} />

        {/* Órbita Média */}
        <View style={[styles.orbitaRing, styles.orbitaRingMedia]}>
          {/* Satélite/Nódulo piscante posicionado sobre a órbita média */}
          <Animated.View style={[styles.sateliteLed, { opacity: opacidadeLed }]} />
        </View>

        {/* Órbita Interna (Pequena) */}
        <View style={[styles.orbitaRing, styles.orbitaRingPequena]} />

        {/* TEXTOS CENTRALIZADOS */}
        <View style={styles.textsContainer}>
          <Text style={styles.mainTitle}>BTG - TERRA</Text>
          <Text style={styles.subTitle}>INDIGO SOVEREIGN INTERFACE</Text>
        </View>

      </Animated.View>

      {/* RODA PÉ: TELEMETRIA DE CONEXÃO E BOTÃO LILÁS DE INICIALIZAÇÃO */}
      <Animated.View style={[styles.footerContainer, { opacity: entradaOpacidade }]}>
        
        {/* Status da Fila DTN Link */}
        <View style={styles.statusRow}>
          <Ionicons name="wifi-sharp" size={14} color={COLORS.accent} style={styles.statusIcon} />
          <Text style={styles.statusText}>DTN Link: Active</Text>
        </View>

        {/* Status de Sincronismo Relativístico */}
        <Text style={styles.syncText}>Relativity Sync: Nom</Text>

        {/* Botão de Conexão em Tom Lilás (Capsule) com efeito de clique */}
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={iniciarConexao}
        >
          <Animated.View style={[styles.conectarBtn, { transform: [{ scale: escalaBotao }] }]}>
            <View style={styles.btnRow}>
              <Text style={styles.conectarBtnText}>INICIAR CONEXÃO</Text>
              <Ionicons name="arrow-forward" size={14} color="#000000" style={styles.btnArrow} />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>

      </Animated.View>

    </View>
  ); // Fim da renderização.
} // Fim do componente SplashPage.

// Estilos de visualização CSS utilizando a fonte Syne-Bold e o tema Void Protocol.
const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: COLORS.background, // Void Black.
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  glowSpotTop: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    top: -100,
    left: -50,
    backgroundColor: 'rgba(0, 133, 255, 0.08)',
  },
  glowSpotBottom: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    bottom: -100,
    right: -50,
    backgroundColor: 'rgba(0, 133, 255, 0.08)',
  },
  contentCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  orbitaRing: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(0, 133, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbitaRingGrande: {
    width: 340,
    height: 340,
  },
  orbitaRingMedia: {
    width: 270,
    height: 270,
  },
  orbitaRingPequena: {
    width: 200,
    height: 200,
  },
  // LED do satélite que simula o nó cislunar orbitando
  sateliteLed: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.cyan,
    top: 40,
    right: 40,
    shadowColor: COLORS.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  textsContainer: {
    alignItems: 'center',
    zIndex: 10,
  },
  mainTitle: {
    fontSize: 26,
    fontFamily: 'Syne-Bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 8,
    fontWeight: '700',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 10,
    fontFamily: 'Syne-Bold',
    color: COLORS.purple, // Cinza/roxo inativo.
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  footerContainer: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
    zIndex: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusIcon: {
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Syne-Bold',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  syncText: {
    fontSize: 10,
    fontFamily: 'Syne-Bold',
    color: COLORS.purple,
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  conectarBtn: {
    backgroundColor: '#B8A3FF', // Lilás / Lavanda conforme a imagem.
    width: '100%',
    borderRadius: 30, // Pílula / Capsule.
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B8A3FF',
    shadowColor: '#B8A3FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conectarBtnText: {
    color: '#000000',
    fontFamily: 'Syne-Bold',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  btnArrow: {
    marginLeft: 8,
  },
});
