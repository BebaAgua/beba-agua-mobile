import styled from "styled-components/native";

export const InitialContainer = styled.View`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  background-color: ${(props) => props.theme.colors.white200};
`;

export const InitialText = styled.Text`
  margin-top: 60%;
  color: ${(props) => props.theme.colors.blue800};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
`;

export const Container = styled.View`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  background-color: ${(props) => props.theme.colors.white200};
`;

export const ItemContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
  background-color: ${(props) => props.theme.colors.white200};
`;

export const Item = styled.View`
  width: 29.3%;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-left: 10px;
`;

export const AmountImage = styled.Image`
  height: 42px;
  width: 42px;
`;

export const AmountText = styled.Text`
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.blue800};
`;

export const CreatedAtText = styled.Text`
  font-size: 12px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.blue800};
`;
