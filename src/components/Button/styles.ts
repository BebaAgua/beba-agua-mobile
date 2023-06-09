import styled from "styled-components/native";

export const StyledTouchableOpacity = styled.TouchableOpacity<{
  size: number;
  color: string;
}>`
  background-color: ${(props) => props.color};
  padding: 10px;
  border-radius: 5px;
  height: 50px;
  width: ${(props) => props.size}px;
  align-items: center;
  justify-content: center;
`;

export const StyledText = styled.Text`
  color: ${(props) => props.theme.colors.white200};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  text-align: center;
  justify-content: center;
`;
