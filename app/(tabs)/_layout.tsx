// ==========================================================================================
// ARQUIVO DE LAYOUT DE ABAS (TABS LAYOUT) - (TABS) GROUP (CHRONOS DTN MOBILE)
// CONFIGURA A BARRA DE ABAS MÍNIMA DO TEMA VOID PROTOCOL INTEGRADA COM A FONTE DM SANS
// ==========================================================================================

// Importa hooks do React Core.
import React, { useEffect, useRef } from 'react';
// Importa componentes estruturais e de animação do React Native.
import { Animated } from 'react-native';
// Importa os componentes de renderização de abas do ecossistema expo-router.
import { Tabs } from 'expo-router';
// Importa o conjunto de ícones de vetor nativos do expo (Ionicons).
import { Ionicons } from '@expo/vector-icons';
// Importa as constantes de cores do tema Void Protocol.
import { COLORS } from '../../constants/Colors';

// Componente auxiliar para animar a escala do ícone ao ser selecionado (efeito clique).
function AnimatedTabBarIcon({ name, color, size, focused }: { name: any; color: string; size: number; focused: boolean }) {
  // Define o valor animado para a escala.
  const escala = useRef(new Animated.Value(1)).current;

  // Dispara a animação sempre que o estado de foco mudar.
  useEffect(() => {
    if (focused) {
      // Executa efeito de clique suave seguido de spring bounce.
      Animated.sequence([
        Animated.timing(escala, { toValue: 1.25, duration: 150, useNativeDriver: true }),
        Animated.spring(escala, { toValue: 1.1, friction: 4, useNativeDriver: true })
      ]).start();
    } else {
      // Retorna para o tamanho padrão.
      Animated.timing(escala, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    }
  }, [focused]);

  return (
    // Renderiza o contêiner animado contendo o ícone.
    <Animated.View style={{ transform: [{ scale: escala }] }}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
}

// Componente principal de navegação de Abas do aplicativo móvel.
export default function TabLayout() {
  // Retorna a estrutura das abas com estilos mínimos resting conforme a Imagem 3.
  return (
    // Configura a barra inferior aplicando regras de cor e layout.
    <Tabs
      screenOptions={{
        // Oculta a barra de cabeçalho padrão de cima para controle personalizado.
        headerShown: false,
        
        // Define o estilo da barra física de abas (Estilo Void Protocol minimalista da Imagem 3).
        tabBarStyle: {
          // Mantém a barra fixa no rodapé nativo do dispositivo.
          position: 'relative',
          // Cor de fundo Void Black absoluto do rodapé.
          backgroundColor: COLORS.background,
          // Borda superior fina de 1px.
          borderTopWidth: 1,
          // Cor da borda superior ligada ao delimitador do tema.
          borderTopColor: COLORS.border,
          // Altura ideal para acomodar textos e ícones.
          height: 70,
          // Espaçamento interno inferior para alinhamento.
          paddingBottom: 12,
          // Espaçamento superior interno.
          paddingTop: 8,
          // Remove sombras elevadas para manter aspecto plano.
          shadowColor: 'transparent',
          elevation: 0,
        },
        // Define a cor de destaque da aba selecionada (Ativa) como Ion Blue.
        tabBarActiveTintColor: COLORS.accent,
        // Define a cor da aba inativa usando o tom inativo do Void Protocol.
        tabBarInactiveTintColor: COLORS.purple,
        // Define o alinhamento, tamanho e fonte DM Sans para as etiquetas.
        tabBarLabelStyle: {
          fontFamily: 'DMSans-Bold',
          fontSize: 9,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
      }}
    >
      {/* Configura a primeira aba correspondente ao Dashboard. */}
      <Tabs.Screen
        name="index"
        options={{
          // Título textual exibido na legenda da aba inferior.
          title: 'Home',
          // Define o ícone de bússola futurista animado.
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabBarIcon name={focused ? 'compass' : 'compass-outline'} size={size - 2} color={color} focused={focused} />
          ),
        }}
      />
      {/* Configura a segunda aba correspondente ao Auditor de Tempo. */}
      <Tabs.Screen
        name="auditor"
        options={{
          // Título da aba de auditoria.
          title: 'Auditor',
          // Define o ícone de pulso futurista animado.
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabBarIcon name={focused ? 'pulse' : 'pulse-outline'} size={size - 2} color={color} focused={focused} />
          ),
        }}
      />
      {/* Configura a terceira aba correspondente ao Gerenciador de Nós (Nodes). */}
      <Tabs.Screen
        name="nodes"
        options={{
          // Título da aba de gerenciamento de nós.
          title: 'Nós',
          // Define o ícone de chip de hardware futurista animado.
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabBarIcon name={focused ? 'hardware-chip' : 'hardware-chip-outline'} size={size - 2} color={color} focused={focused} />
          ),
        }}
      />
      {/* Configura a quarta aba correspondente ao Buffer DTN. */}
      <Tabs.Screen
        name="buffer"
        options={{
          // Título da aba de monitoramento de fila.
          title: 'Buffer',
          // Define o ícone de loop infinito futurista animado.
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabBarIcon name={focused ? 'infinite' : 'infinite-outline'} size={size - 2} color={color} focused={focused} />
          ),
        }}
      />
      {/* Configura a quinta aba correspondente ao Perfil de Configurações (ocultada da barra de abas). */}
      <Tabs.Screen
        name="profile"
        options={{
          // Remove a aba visualmente da barra inferior.
          href: null,
        }}
      />
    </Tabs>
  ); // Fim da renderização.
} // Fim do componente TabLayout.
