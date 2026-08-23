/**
 * ============================================================
 * NINJA POKER — CONFIGURAÇÃO CENTRAL
 * ============================================================
 * Este é o ÚNICO arquivo que precisa ser editado para atualizar
 * links, textos numéricos e IDs de analytics do site.
 * Nenhuma dessas informações está espalhada pelo restante do código.
 * ============================================================
 */

window.NINJA_CONFIG = {
  // Identidade
  NOME_DA_AGENCIA: "Ninja Poker",

  // Links de contato — troque pelo link real antes de publicar.
  // Formato esperado: https://wa.me/55DDDNUMERO (somente dígitos após "wa.me/")
  WHATSAPP_URL: "https://wa.me/+5545999370097",
  INSTAGRAM_URL: "https://instagram.com/rafaelmooroo",
  SUPREMA_POKER_URL: "https://suprema.poker",

  // Ativo de marca
  LOGO_URL: "assets/logo-ninja-poker-trimmed.webp",
  LOGO_URL_PNG: "assets/logo-ninja-poker-trimmed.png",

  // Mensagens pré-preenchidas por contexto de clique (aparecem já digitadas no WhatsApp)
  WHATSAPP_MENSAGENS: {
    default: "Olá! Quero saber como faço para entrar na Ninja Poker.",
    hero: "Olá! Vi o site da Ninja Poker e quero entrar para a agência.",
    header: "Olá! Quero falar com a equipe da Ninja Poker.",
    ctaIntermediario: "Olá! Quero entrar para a Ninja Poker agora.",
    ctaFinal: "Olá! Quero fazer parte da Ninja Poker.",
    faq: "Olá! Tenho uma dúvida sobre a Ninja Poker.",
    mobileBar: "Olá! Quero entrar para a Ninja Poker.",
    whatsappFlutuante: "Olá! Quero falar com a Ninja.",
  },

  // Seção de números — conteúdo configurável. Não são inventados: são placeholders
  // que devem ser atualizados com os dados reais da agência antes da publicação.
  ESTATISTICAS: {
    JOGADORES_ATIVOS: { valor: 500, prefixo: "", sufixo: "+", label: "Jogadores ativos" },
    RAKEBACK_DISTRIBUIDO: { valor: 400, prefixo: "R$ ", sufixo: "K+", label: "Rakeback distribuído" },
    SATISFACAO: { valor: 98, prefixo: "", sufixo: "%", label: "Satisfação" },
    TEMPO_TRANSACAO: { valor: 5, prefixo: "< ", sufixo: " min", label: "Tempo médio de transação" },
  },

  // Analytics — placeholders. Substitua pelos IDs reais quando disponíveis.
  ANALYTICS: {
    GOOGLE_ANALYTICS_ID: "G-XXXXXXXXXX",
    GTM_ID: "GTM-XXXXXXX",
    META_PIXEL_ID: "000000000000000",
  },
};
