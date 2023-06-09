import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin-top: 64px;
  margin-bottom: 16px;
  background-color: ${(props) => props.theme.colors.white200};
  border-radius: 5px;
`;

export const ContainerButton = styled.View`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
`;
