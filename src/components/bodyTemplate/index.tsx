import { PropsWithChildren } from "react";

import { BodyContainer, HeaderView, MainView } from "./styles";
import { StatusBar } from "react-native";

interface BodyTemplateProps {
  header?: React.ReactNode;
}

export function BodyTemplate(
{header, children}: PropsWithChildren<BodyTemplateProps>) {

  return (
    <BodyContainer>
      <StatusBar />
      <HeaderView>
        { header }
      </HeaderView>
      <MainView>
        { children }
      </MainView>
    </BodyContainer>
  );
}