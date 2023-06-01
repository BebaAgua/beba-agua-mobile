import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const UpdateProfileContainer = styled.View`
  margin-top: 20px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
`;
