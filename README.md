# Chronos DTN — App Mobile (React Native + Expo)

> Módulo de aplicativo móvel do gateway financeiro **Chronos DTN**. Interface do operador cislunar para monitoramento de saldo, telemetria da rede DTN, auditoria de tempo relativístico e disparo de remessas financeiras Terra-Lua. Construído em **React Native** com **Expo Router** e design system **Void Protocol**.

---

## 🛰️ Sobre o Módulo

O aplicativo é a interface principal que o operador da estação lunar utiliza para interagir com o sistema de liquidação interplanetário. Ele simula as condições físicas reais do ambiente cislunar:

- **Latência de 1,28 segundos** em todas as operações (tempo de ida e volta do sinal de rádio Terra-Lua)
- **Skeleton Screen** durante o carregamento, representando a espera pelo sinal
- **Auditor de Tempo Relativístico** com correção de **+56 μs/dia** de drift gravitacional
- **Animações físicas** — planeta Terra rotacionando (30s), Lua em órbita e estrelas cintilantes

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Função |
|---|---|---|
| React Native | 0.74+ | Framework de UI nativa multiplataforma |
| Expo SDK | 51+ | Toolchain e módulos nativos gerenciados |
| Expo Router | 3.x | Navegação baseada em sistema de arquivos |
| TypeScript | 5.x | Tipagem estática e segurança de código |
| expo-linear-gradient | latest | Gradientes nativos (galáxia, glassmorphic) |
| @expo-google-fonts/syne | latest | Fonte Syne Bold (display e títulos) |
| @expo-google-fonts/dm-sans | latest | Fonte DM Sans (corpo e labels) |
| React Native Animated API | nativo | Animações de estrelas, órbita e bordas neon |

---

## 📂 Estrutura de Pastas

```
mobile-app/
├── app/
│   ├── index.tsx              # Splash Page — tela de entrada com animação orbital
│   ├── _layout.tsx            # Root layout: carregamento de fontes e navegação
│   └── (tabs)/
│       ├── _layout.tsx        # Tab bar: Home, Auditor, Nós, Buffer
│       ├── index.tsx          # Dashboard — carteira, telemetria e remessa
│       ├── auditor.tsx        # Auditor de Tempo — relógios e correção relativística
│       ├── nodes.tsx          # Gerenciador de Nós DTN
│       ├── buffer.tsx         # Monitor da fila de buffer cislunar
│       └── profile.tsx        # Perfil e configurações do operador
├── constants/
│   └── Colors.ts              # Design tokens — paleta Void Protocol
├── DESIGN.md                  # Guia completo do design system Void Protocol
└── package.json               # Dependências e scripts do projeto
```

---

## ▶️ Como Executar

### Pré-requisitos

- [Node.js 18+](https://nodejs.org/) instalado
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado globalmente:
  ```bash
  npm install -g expo-cli
  ```
- App **Expo Go** instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento

```bash
npx expo start
```

### 3. Abrir no dispositivo

- **Celular físico:** Escaneie o QR Code exibido no terminal com o app **Expo Go**.
- **Emulador Android:** Pressione `a` no terminal.
- **Simulador iOS (macOS):** Pressione `i` no terminal.

---

## 🎨 Design System — Void Protocol

O app utiliza o design system proprietário **Void Protocol**, documentado em `DESIGN.md`. Paleta principal:

| Token | Cor | Uso |
|---|---|---|
| `background` | `#0A0E1A` | Fundo Void Black (espaço profundo) |
| `accent` | `#0085FF` | Ion Blue — CTAs e destaque ativo |
| `cyan` | `#00D4FF` | Status online e latência |
| `gold` | `#FFB800` | Alertas e relógio lunar |
| `purple` | `#4A5568` | Labels e textos secundários |
| `textPrimary` | `#FFFFFF` | Texto principal |
| `textSecondary` | `#C8D6E5` | Lunar Silver — subtítulos |

---

## 📱 Telas do Aplicativo

| Tela | Descrição |
|---|---|
| **Splash** | Animação de entrada com órbita e botão "INICIAR CONEXÃO" |
| **Home** | Dashboard com saldo, Fila DTN, Nós Ativos, Drift, Latência e remessa |
| **Auditor** | Barra de dias da semana + círculo de reconciliação + relógios cintilantes |
| **Nós** | Lista e gerenciamento dos nós gateways da rede DTN |
| **Buffer** | Fila de transações retidas aguardando enlace |
| **Perfil** | Configurações e informações do operador |

---

## 🔗 Repositórios do Projeto Chronos DTN

| Módulo | Descrição |
|---|---|
| [backend-java](https://github.com/seu-usuario/chronos-backend-java) | API principal Spring Boot 3 + JWT |
| [backend-dotnet](https://github.com/seu-usuario/chronos-backend-dotnet) | API secundária .NET 8 + EF Core |
| [database](https://github.com/seu-usuario/chronos-database) | Scripts Oracle SQL e Procedure PL/SQL |
| [devops](https://github.com/seu-usuario/chronos-devops) | Docker Compose e Dockerfile |
| [iot-esp32](https://github.com/seu-usuario/chronos-iot-esp32) | Firmware C++ Arduino para ESP32 |

---

## 👤 Autores

Projeto desenvolvido para a **Global Solution — FIAP 2026**.
