---
name: diagnose-with-evidence
description: "Diagnosticar bugs, falhas intermitentes e regressões de desempenho com reprodução, minimização, hipóteses falsificáveis e evidências. Usar quando o usuário pedir diagnóstico, depuração, análise de causa raiz ou relatar comportamento quebrado, lento, instável ou inesperado."
---

# Diagnose with Evidence

Descobrir a causa antes de propor a correção. Respeitar o escopo: diagnóstico não autoriza editar;
um pedido explícito para corrigir autoriza a menor correção completa.

## Proteger dados

- Não exibir segredos, tokens, cabeçalhos de autenticação, dados pessoais ou valores de `.env`.
- Redigir artefatos antes de citá-los e preferir variáveis de ambiente a credenciais em comandos.
- Pedir um artefato redigido quando a evidência necessária não estiver acessível com segurança.

## Construir o sinal

1. Definir o sintoma observável e o resultado esperado.
2. Criar o menor comando que percorra o caminho real e consiga distinguir falha de sucesso.
3. Executá-lo antes de formar uma teoria. Preferir teste focado, chamada HTTP, fixture, script de
   navegador, replay ou medição de baseline, nessa ordem de adequação ao caso.
4. Tornar o sinal determinístico e rápido: fixar tempo e aleatoriedade, isolar filesystem e evitar
   rede quando não fizer parte do defeito.

Se não for possível reproduzir, registrar o que foi tentado e qual acesso, trace ou amostra falta.
Não transformar ausência de evidência em uma causa inventada.

## Isolar a causa

1. Minimizar entrada, configuração e caminho de execução sem perder o sintoma.
2. Formular poucas hipóteses ordenadas. Para cada uma, declarar qual observação a confirmaria ou
   falsificaria.
3. Testar uma variável por vez. Preferir debugger, inspeção de estado e logs estruturados e
   temporários; medir regressões de desempenho antes de otimizá-las.
4. Separar causa raiz, fatores contribuintes e sintomas correlatos.

Compartilhar hipóteses quando o conhecimento de domínio do usuário puder reordená-las, mas continuar
com a melhor evidência disponível se a pergunta não for bloqueante.

## Interromper churn

Contar hipóteses rejeitadas para o mesmo sintoma. Após três tentativas de correção que falhem apesar
de evidência e verificação adequadas, interromper novas mudanças e reavaliar:

- se a reprodução representa o defeito real;
- se o contrato esperado está correto;
- se existe acoplamento ou estado compartilhado não observado;
- se o problema exige uma decisão arquitetural.

Não contornar o limite renomeando a hipótese ou empilhando outra correção. Apresentar as evidências,
alternativas descartadas e a decisão necessária antes de uma quarta tentativa. Tentativas que
falharam por erro de execução ou teste inválido não contam como hipóteses falsificadas.

## Corrigir quando autorizado

1. Converter a reprodução mínima em teste de regressão no limite público correto, quando houver.
2. Observar o teste falhar pela razão esperada.
3. Aplicar a menor correção da causa, sem limpeza adjacente não solicitada.
4. Observar o teste passar e repetir o cenário original não minimizado.
5. Executar os gates proporcionais ao risco e remover toda instrumentação temporária.

## Entregar

Relatar sintoma, causa, evidência que descartou alternativas, correção realizada se autorizada,
testes executados e incerteza restante. Não declarar causa raiz com confiança maior que a evidência.
