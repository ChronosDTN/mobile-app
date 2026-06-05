// ==========================================================================================
// TELA DE PERFIL E CONFIGURAÇÃO - TEMA VOID PROTOCOL (CHRONOS DTN MOBILE)
// SEÇÕES DE ENTRADA JWT COM FONTES GOOGLE E CORES DA IMAGEM 1
// ==========================================================================================

// Importa hooks de estado e tempo de execução do React Core.
import React, { useState, useEffect } from 'react';
// Importa componentes estruturais e de interface interativa do React Native.
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// Importa o conjunto de ícones vetoriais da Expo.
import { Ionicons } from '@expo/vector-icons';
// Importa as cores da paleta Void Protocol.
import { COLORS } from '../../constants/Colors';

// Componente principal correspondente à tela de Perfil e Configurações.
export default function ProfileScreen() {
  // Estado local para controle do carregamento de rede inicial.
  const [carregando, setCarregando] = useState(true);
  // Estado para armazenar o IP configurado do gateway central da Terra.
  const [ipGateway, setIpGateway] = useState('192.168.1.100');
  // Estado para armazenar o token JWT.
  const [tokenJwt, setTokenJwt] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsdW5hci1vcGVyYXRvci0wMSIsImlhdCI6MTcxNzM2OTYwMH0...');
  // Estado para armazenar o identificador do operador.
  const [operador, setOperador] = useState('lunar-operator-01');

  // Efeito disparado na inicialização para simular o delay cislunar físico.
  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 1280);
    return () => clearTimeout(timer);
  }, []);

  // Grava localmente as alterações nos dados de conexão.
  const gravarDefinicoes = () => {
    Alert.alert(
      'Configurações Atualizadas',
      'As novas diretrizes de conexão JWT e endereço IP foram ativadas no app.',
      [{ text: 'Confirmar' }]
    );
  };

  // Se a tela estiver carregando.
  if (carregando) {
    return (
      <View style={styles.containerCentro}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.textoLoading}>Carregando definições de segurança...</Text>
      </View>
    );
  }

  // Renderiza a interface final do perfil.
  return (
    <View style={styles.containerPrincipal}>
      
      {/* Ponto de brilho superior esquerdo. */}
      <View style={styles.glowSpotSilver1} />
      {/* Ponto de brilho inferior direito. */}
      <View style={styles.glowSpotSilver2} />

      {/* Rolagem. */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        
        {/* Título de seção em caixa alta técnica. */}
        <Text style={styles.screenTitle}>CONFIGURAÇÕES</Text>

        {/* Cartão contendo informações de identificação do operador. */}
        <View style={styles.cardOperador}>
          <View style={styles.rowHeaderCard}>
            <Ionicons name="person-outline" size={12} color={COLORS.textSecondary} style={styles.iconEspacado} />
            <Text style={styles.tituloOperador}>OPERADOR AUTENTICADO</Text>
          </View>
          <Text style={styles.valorUsuario}>{operador}</Text>
          <Text style={styles.nivelAcesso}>Nível de Acesso: Admin Cislunar</Text>
        </View>

        {/* Cartão de configurações de IP do Gateway da rede. */}
        <View style={styles.cardConfig}>
          <View style={styles.rowHeaderCardDivider}>
            <Ionicons name="wifi-outline" size={12} color={COLORS.textSecondary} style={styles.iconEspacado} />
            <Text style={styles.tituloCard}>DIRETRIZES DE COMUNICAÇÃO</Text>
          </View>
          <Text style={styles.labelInput}>Endereço IP do Gateway (Terra):</Text>
          <TextInput
            style={styles.input}
            value={ipGateway}
            onChangeText={setIpGateway}
            placeholder="Ex: 192.168.1.100"
            placeholderTextColor="#4b5563"
          />
        </View>

        {/* Cartão de configuração da chave JWT. */}
        <View style={styles.cardConfig}>
          <View style={styles.rowHeaderCardDivider}>
            <Ionicons name="lock-closed-outline" size={12} color={COLORS.textSecondary} style={styles.iconEspacado} />
            <Text style={styles.tituloCard}>AUTENTICAÇÃO STATELESS</Text>
          </View>
          <Text style={styles.labelInput}>Token Bearer JWT:</Text>
          <TextInput
            style={styles.inputArea}
            value={tokenJwt}
            onChangeText={setTokenJwt}
            multiline
            numberOfLines={4}
            placeholder="JWT Token"
            placeholderTextColor="#4b5563"
          />
        </View>

        {/* Botão de gravação física (Pílula em Ion Blue). */}
        <TouchableOpacity 
          style={styles.botaoGravar}
          onPress={gravarDefinicoes}
        >
          <View style={styles.rowBotaoConteudo}>
            <Ionicons name="save-outline" size={14} color="#000000" style={styles.iconBotaoEspacado} />
            <Text style={styles.textoBotaoGravar}>GRAVAR CREDENCIAIS DE REDE</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  ); // Fim da renderização.
} // Fim do componente ProfileScreen.

// Estilos de visualização CSS para o Perfil.
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
    marginBottom: 24,
    letterSpacing: 1.5,
  },
  cardOperador: {
    backgroundColor: COLORS.glassSurface,
    borderRadius: 12, // Cantos arredondados de 12px.
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  rowHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconEspacado: {
    marginRight: 6,
  },
  tituloOperador: {
    fontSize: 10,
    fontFamily: 'DMSans-Bold',
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
  valorUsuario: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  nivelAcesso: {
    fontSize: 11,
    fontFamily: 'DMSans-Medium',
    color: COLORS.purple,
  },
  cardConfig: {
    backgroundColor: COLORS.glassSurface,
    borderRadius: 12, // Cantos arredondados de 12px.
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  rowHeaderCardDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 6,
  },
  tituloCard: {
    fontSize: 11,
    fontFamily: 'DMSans-Bold',
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
  labelInput: {
    color: COLORS.textSecondary,
    fontFamily: 'DMSans-Medium',
    fontSize: 11,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#05070d', // Fundo mais escuro.
    color: COLORS.textPrimary,
    padding: 12,
    borderRadius: 8, // Cantos de 8px.
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 13,
    fontFamily: 'DMSans-Regular',
  },
  inputArea: {
    backgroundColor: '#05070d',
    color: COLORS.textPrimary,
    padding: 12,
    borderRadius: 8, // Cantos de 8px.
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 11,
    fontFamily: 'monospace',
    textAlignVertical: 'top',
    height: 80,
  },
  botaoGravar: {
    backgroundColor: COLORS.accent, // Acento Ion Blue.
    padding: 16,
    borderRadius: 30, // Pílula.
    alignItems: 'center',
    marginBottom: 35,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  rowBotaoConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBotaoEspacado: {
    marginRight: 8,
  },
  textoBotaoGravar: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'DMSans-Bold',
    letterSpacing: 1,
  },
});
