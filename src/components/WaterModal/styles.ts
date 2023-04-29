import styled from "styled-components/native";

export const ModalWater = styled.Modal``;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Content = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 10px;
  padding: 20px;
  align-items: center;
`;

export const WaterImage = styled.Image`
  width: 80px;
  height: 80px;
`;

export const Title = styled.Text`
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 20px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.textInput};
`;

export const OptionButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 210px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.secondary};
  margin-top: 10px;
`;
export const OptionText = styled.Text`
  font-size: 14px;
  margin-left: 10px;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.regular};
`;
