# Ninja Poker — Site institucional

Site estático (HTML/CSS/JS puro, sem build necessário) pronto para publicação.

## Estrutura

```
index.html                          → página principal
css/style.css                       → design system completo (tokens, componentes, seções)
js/config.js                        → ÚNICO arquivo a editar para links e números
js/script.js                        → interações (menu, accordion, contadores, tracking)
assets/                             → logo oficial (webp otimizado + png de fallback) e favicons
legal/politica-de-privacidade.html
legal/termos-de-uso.html
legal/jogo-responsavel.html
robots.txt
sitemap.xml
```

## Antes de publicar — edite `js/config.js`

1. `WHATSAPP_URL` — troque `https://wa.me/SEUNUMEROAQUI` pelo link real
   (formato `https://wa.me/55DDDNUMERO`, apenas dígitos).
2. `INSTAGRAM_URL` / `SUPREMA_POKER_URL` — links reais quando disponíveis.
3. `ESTATISTICAS` — os números da seção "Estatísticas" (jogadores ativos,
   rakeback distribuído, satisfação, tempo médio de transação) são
   placeholders configuráveis. Atualize com os dados reais da agência
   antes de publicar — eles também precisam ser atualizados manualmente
   dentro de `index.html` nos atributos `data-count-target` da seção
   `<!-- ESTATÍSTICAS -->`, já que o HTML usa esses números diretamente
   nos cartões (o config.js documenta o valor de referência).
4. `ANALYTICS` — substitua os IDs de Google Analytics, GTM e Meta Pixel.
   Depois, descomente o bloco de script no `<head>` do `index.html`
   (marcado com o comentário "Google Analytics / GTM — placeholders").

## Domínio e SEO

- Troque `https://ninjapoker.com.br/` pelo domínio real em:
  `index.html` (canonical, Open Graph, schema), `robots.txt`, `sitemap.xml`.

## Eventos de conversão já implementados

`click_whatsapp`, `click_cta`, `click_how_it_works`, `faq_open`,
`scroll_50`, `scroll_90` — todos disparados via `window.dataLayer.push`
e, quando presentes, `gtag()` / `fbq()`. Não é necessário alterar código
para rastrear esses eventos — basta configurar GA4/GTM/Meta Pixel.

## Publicação

Qualquer hospedagem de arquivos estáticos funciona (Vercel, Netlify,
Cloudflare Pages, S3 + CloudFront, cPanel, etc.) — não há dependência de
servidor ou build step. Basta enviar a pasta inteira.

## Observações importantes

- A logo fornecida foi utilizada como asset oficial, sem qualquer
  alteração de desenho, cores ou tipografia — apenas recortada (crop)
  para remover a margem transparente e exportada em WebP para
  performance, com fallback em PNG.
- Nenhum número, prova social ou informação institucional foi inventado:
  os dados da seção de estatísticas estão marcados como placeholders
  editáveis, conforme solicitado.
- Textos evitam afirmar que a Ninja Poker é dona/operadora do Suprema
  Poker — a relação é sempre descrita como agência/suporte ao H10 Poker.
