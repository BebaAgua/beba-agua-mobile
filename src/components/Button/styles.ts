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
  color: #fff;
  font-size: 18px;
  text-align: center;
  justify-content: center;
`;
