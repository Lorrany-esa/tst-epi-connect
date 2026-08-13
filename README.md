# TST EPI Connect

Crie uma página inicial (Landing Page) e estrutura para um e-commerce / catálogo digital de equipamentos de proteção individual (EPI) para a empresa "TST Distribuidora de EPI LTDA".

### ⚠️ REGRA TÉCNICA OBRIGATÓRIA:
- NÃO UTILIZE TanStack Router (@tanstack/react-router) ou TanStack Query.
- Use navegação simples baseada em estados do React (useState) ou React Router DOM padrão (react-router-dom) em modo Single Page Application (SPA) para que o build final seja composto apenas por arquivos estáticos simples (HTML, CSS, JS), prontos para serem hospedados em hospedagem compartilhada como HostGator.

---

### 🎨 Identidade Visual e Estilo:
- **Nome da Empresa:** TST Distribuidora de EPI LTDA
- **Slogan:** "EPI, ferramentas e produtos industriais de qualidade. Segurança e confiança para o seu trabalho."
- **Cores Principais:** 
  - Verde vibrante (#00E676 / #10B981) - cor destaque do logo/Instagram.
  - Preto/Grafite escuro (#111827 / #000000) - para cabeçalho, fundos escuros e contraste.
  - Branco e Cinza claro (#F9FAFB / #F3F4F6) - para fundos de seções e cartões de produtos.
- **Estilo:** Profissional, moderno, focado em vendas corporativas/B2B e atacado/varejo.

---

### 📐 Estrutura do Site (Inspirada no modelo de referência BHZ EPI):

1. **Topo Superior (Barra de Destaque / Contato):**
   - Telefone de Tele-vendas destacado (ex: Tele Vendas / WhatsApp).
   - Ícones com links para Redes Sociais (Instagram, WhatsApp, Facebook).

2. **Cabeçalho Principal (Header):**
   - Logo da "TST Distribuidora" (círculo preto com letras em verde e ícone de capacete).
   - Barra de pesquisa centralizada: "Pesquisar Produtos, Óculos, Capacetes, Botas...".
   - Botão/Ícone flutuante ou destacado do WhatsApp.

3. **Menu de Navegação Principal:**
   - Links: Início | Sobre Nós | Catálogo de Produtos | Consultar CA (Certificado de Aprovação) | Fale Conosco.

4. **Banner Principal (Hero Section):**
   - Imagem de fundo industrial ou de canteiro de obras com sobreposição escura.
   - Título impactante: "AS PRINCIPAIS LINHAS DE EPI COM AMPLA VARIEDADE E PRONTA ENTREGA."
   - Subtítulo: "A segurança do seu colaborador começa com a TST Distribuidora."
   - Botão de Ação (CTA): "ACESSAR CATÁLOGO DE PRODUTOS" (Verde vibrante).
   - Card/Banner promocional ao lado destacando ofertas ou "Kits de Segurança".

5. **Barra de Vantagens (Abaixo do Hero):**
   - 4 ícones informativos: 
     - 🚚 Entrega Rápida e Garantida
     - 💳 Condições Facilitadas de Pagamento
     - 📞 Atendimento Especializado B2B
     - 🛡️ Produtos com CA Aprovado

6. **Seção de Categorias em Destaque:**
   - Grade com cards visuais de categorias: Capacetes, Proteção Auditiva, Luvas de Proteção, Calçados de Segurança, Proteção Respiratória, Ferramentas e Kits de Emergência.

7. **Seção de Produtos Populares / Mais Vendidos:**
   - Exibir cards de produtos com: Foto do produto, Título, Código CA (ex: CA: 12345), Preço ou botão "Solicitar Orçamento via WhatsApp".

8. **Campo de Consulta de CA (Certificado de Aprovação):**
   - Um pequeno bloco funcional onde o usuário digita o número do CA para verificar se os equipamentos atendem às normas do Ministério do Trabalho.

9. **Rodapé (Footer):**
   - Informações completas de contato (Endereço, E-mail, Telefone, WhatsApp).
   - Links rápidos de navegação.
   - Direitos autorais: "TST Distribuidora de EPI LTDA © Todos os direitos reservados."

10. **Widget Fixo do WhatsApp:**
    - Botão flutuante no canto inferior direito para contato direto no WhatsApp.

Por favor, faça um design limpo, totalmente responsivo (mobile-first) e pronto para ser exportado como um build estático funcional.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7db85176-aff6-4bf5-82d5-ada91f2cd671).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
