import styled from "styled-components/native";

export const ModalCongratulation = styled.Modal``;

export const Container = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  background-color: ${(props) => props.theme.colors.white200};
  border-radius: 10px;
  padding: 20px;
  align-items: center;
`;

export const CongratulationImage = styled.Image`
  width: 80px;
  height: 80px;
`;

export const CongratulationText = styled.Text`
  margin-top: 20px;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.regular};
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.gray600};
  align-items: center;
  text-align: center;
`;
