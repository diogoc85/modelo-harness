---
name: classify-delivery-model
description: "Classificar um PRD ou proposta de produto como aplicação tradicional, SaaS, Service as Software ou híbrido e aplicar o perfil correspondente antes do planejamento de implementação. Usar ao iniciar um produto, receber um novo PRD ou quando mudanças alterarem tenancy, cobrança, autonomia de agentes ou responsabilidade por resultados."
---

# Classify Delivery Model

Classificar o valor entregue antes de escolher arquitetura. A classificação seleciona requisitos;
ela não autoriza implementação nem substitui a intenção expressa pelo usuário.

## Reunir evidências

1. Ler `docs/product/PRD.md`, a solicitação atual e decisões relevantes.
2. Ler `.harness/delivery-models.json` e `docs/product/profiles/README.md`.
3. Identificar quem executa o trabalho, o que o cliente compra, como o resultado é medido, se há
   múltiplos clientes e como cobrança ou consumo funcionam.
4. Reutilizar fatos já fornecidos e não inventar tenancy, billing, agentes ou autonomia.

## Classificar

- **traditional:** pessoas operam uma aplicação sem requisitos materiais de serviço recorrente.
- **saas:** clientes recebem acesso contínuo a um produto hospedado e operam suas funcionalidades.
- **service-as-software:** software executa um serviço de ponta a ponta e responde por um resultado
  verificável.
- **hybrid:** um produto SaaS também entrega resultados por workflows autônomos ou supervisionados.

Uma funcionalidade de IA isolada não é Service as Software. Procurar responsabilidade pelo workflow
e pelo resultado, não apenas uso de um modelo.

Se o PRD declarar um modelo coerente com o comportamento, aceitar a declaração. Se duas opções
plausíveis mudarem isolamento de dados, cobrança, autonomia, segurança ou arquitetura, apresentar a
ambiguidade e pedir confirmação antes do plano de implementação.

## Aplicar o perfil

1. Ler o documento do perfil selecionado no manifesto.
2. Para `service-as-software` ou `hybrid`, ler também
   `docs/architecture/AGENTIC_SYSTEM.md`.
3. Produzir um diagnóstico curto com classificação, confiança, evidências, requisitos já atendidos,
   decisões pendentes e riscos.
4. Registrar a classificação confirmada no PRD antes de implementar um novo produto.
5. Derivar critérios de aceite e plano somente depois de resolver decisões materiais.

Não adicionar dependências, provedores, billing, multi-tenancy ou runtime de agentes por precaução.
Implementar somente quando a solicitação também autorizar mudanças de código.

## Concluir

Informar:

- perfil escolhido e justificativa observável;
- confiança alta, média ou baixa;
- perfis consultados;
- lacunas que bloqueiam planejamento ou implementação;
- próximo passo compatível com a autorização atual.
