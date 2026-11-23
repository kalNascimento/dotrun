# dotRUN

App em React Native (Expo SDK 58) para registrar corridas: login com Firebase Auth, rastreamento de localização em primeiro e segundo plano, mapa do trajeto, cronômetro e distância percorrida.

## Requisitos

- Node.js 20 ou mais recente
- Android Studio com um emulador ou um aparelho com depuração USB (o app usa módulos nativos, então não roda no Expo Go)

## Configuração

1. Copie `.env.example` para `.env` e preencha as chaves do Firebase e da Google Maps API. O `.env` não é versionado.
2. Instale as dependências:

   ```sh
   npm install
   ```

## Rodando

```sh
npx expo run:android   # gera o build de desenvolvimento e instala no aparelho/emulador
npm start              # nas próximas vezes, só sobe o Metro
```

Depois de atualizar o SDK do Expo ou bibliotecas nativas, refaça o código nativo com `npx expo prebuild --clean`.

## Testes e verificação

```sh
npm test             # Jest + React Native Testing Library
npm run lint         # ESLint (eslint-config-expo)
npm run typecheck    # tsc --noEmit
npx expo-doctor      # saúde do projeto Expo
```

## Estrutura

```
src/
  common/       configuração do Firebase e do React Query
  components/   componentes reutilizáveis (botões, inputs, header, alertas)
  screens/      telas (Auth, RequestLocationPermission, Home)
  hooks/        useAuthUser, useRunTracking
  services/     task de localização em segundo plano e persistência da corrida
  routes/       navegação condicional por estado de autenticação
  utils/        cálculo de distância e filtro de pontos
  theme/        tema do styled-components
```

Os aliases de import (`@buttons`, `@hooks`, `@configs`…) estão em `babel.config.js` e `tsconfig.json`.
