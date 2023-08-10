import { PropsWithChildren } from "react";

import { BodyContainer, HeaderView, MainView } from "./styles";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../../theme/Theme";

interface BodyTemplateProps {
  header?: React.ReactNode;
}

export function BodyTemplate(
  { header, children }: PropsWithChildren<BodyTemplateProps>) {

  return (
    <ThemeProvider theme={theme}>
      <BodyContainer>
        <StatusBar />
        {header &&
          <HeaderView>
            {header}
          </HeaderView>
        }
        <MainView>
          {children}
        </MainView>
      </BodyContainer>
    </ThemeProvider>
  );
}