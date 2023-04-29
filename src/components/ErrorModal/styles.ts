import styled from "styled-components/native";

export const ModalError = styled.Modal``;

export const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;
export const ViewContainerIcon = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextIcon = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
`;

export const ViewContainer = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const TextError = styled.Text`
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.regular};
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.textInput};
  align-items: center;
  text-align: center;
`;
