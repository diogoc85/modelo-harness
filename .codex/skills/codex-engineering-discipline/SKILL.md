---
name: codex-engineering-discipline
description: Aplicar disciplina de engenharia ao implementar, corrigir, revisar ou refatorar software com Codex. Usar em mudanças de código que exijam entender o repositório, preservar intenção e escopo, evitar complexidade especulativa, decidir com autonomia proporcional ao risco e comprovar o resultado com verificações adequadas.
---

# Codex Engineering Discipline

Produzir a menor mudança completa que satisfaça a intenção do usuário e seja sustentada por evidências. Adaptar o rigor ao risco, ao contexto e ao tipo de trabalho.

## Estabelecer a intenção

Antes de editar:

1. Ler as instruções aplicáveis, especialmente `AGENTS.md`, documentação próxima, configuração e testes relevantes.
2. Inspecionar o código e o histórico local necessário para substituir suposições por evidências.
3. Formular internamente o resultado esperado, as restrições e como verificar a conclusão.
4. Distinguir requisitos explícitos, inferências seguras e decisões materiais ainda abertas.

Não exigir que o usuário especifique detalhes que possam ser descobertos no repositório.

## Decidir com autonomia proporcional ao risco

Classificar decisões antes de interromper o trabalho:

- **Segura e reversível:** escolher a opção mais simples que combine com o projeto, registrar a suposição quando ela for relevante e prosseguir.
- **Incerta, mas verificável:** investigar, implementar de forma limitada e validar.
- **Material ou difícil de reverter:** pedir direção quando as alternativas alterarem produto, dados, segurança, custo, compatibilidade pública ou arquitetura de maneira significativa.

Não perguntar por preferência meramente estética quando o projeto já indicar uma convenção. Não ocultar ambiguidade material nem inventar requisitos.

## Escolher o modo de trabalho

Calibrar o processo ao pedido:

- **Correção:** reproduzir o defeito quando viável, corrigir a causa e executar um teste de regressão.
- **Funcionalidade:** identificar o comportamento observável, implementar o caminho mínimo completo e testar casos importantes.
- **Refatoração:** estabelecer uma linha de base, preservar comportamento e comparar as verificações antes e depois.
- **Protótipo:** priorizar aprendizado e velocidade, marcar atalhos relevantes e evitar infraestrutura prematura.
- **Revisão ou diagnóstico:** inspecionar e relatar evidências; não alterar arquivos sem autorização para implementar.

Usar plano somente quando houver etapas dependentes, risco relevante ou trabalho suficientemente longo para se beneficiar dele.

## Implementar com precisão

- Alterar apenas arquivos e linhas relacionados ao resultado solicitado.
- Combinar com os padrões, nomes e abstrações já usados no projeto.
- Preferir código direto a abstrações de uso único ou extensibilidade hipotética.
- Não adicionar funcionalidades, opções, dependências ou tratamento de casos sem justificativa atual.
- Remover resíduos criados pela própria mudança, como imports, variáveis e arquivos que ficaram órfãos.
- Preservar comentários, formatação e código adjacente que não precisem mudar.
- Mencionar problemas encontrados fora do escopo sem corrigi-los silenciosamente.

Aceitar uma mudança maior quando ela for necessária para obter uma solução completa, coerente e segura. Manter cada linha rastreável à intenção, não necessariamente à formulação literal do pedido.

## Verificar em camadas

Escolher a menor combinação que forneça confiança proporcional ao risco:

1. Executar teste focado ou reprodução do comportamento alterado.
2. Executar análise estática, lint, typecheck ou build aplicável.
3. Executar a suíte mais ampla quando houver impacto transversal ou quando o custo for razoável.
4. Inspecionar o diff para detectar mudanças acidentais, complexidade desnecessária e arquivos esquecidos.

Não afirmar que algo funciona sem evidência. Se uma verificação não puder ser executada, informar exatamente qual ficou pendente e por quê. Não confundir falha preexistente com regressão introduzida.

## Concluir com clareza

Entregar um resumo curto contendo:

- resultado obtido;
- decisões ou suposições materiais;
- verificações executadas e seus resultados;
- limitações ou riscos restantes, somente quando existirem.

Evitar narrar detalhes operacionais sem valor para o usuário. Não declarar conclusão enquanto faltar trabalho necessário e seguro dentro do escopo.

## Critério de qualidade

Considerar o trabalho concluído quando:

- o comportamento solicitado estiver implementado ou a análise estiver respondida;
- o diff não contiver mudanças sem relação justificável;
- a complexidade adicionada corresponder a uma necessidade atual;
- as verificações relevantes passarem, ou suas limitações estiverem explicitadas;
- o usuário conseguir entender o resultado e o estado restante sem reconstruir o processo.
