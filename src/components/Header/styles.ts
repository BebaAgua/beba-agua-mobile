import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin-top: 40px;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.secondary};
`;

export const Subtitle = styled.Text`
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.secondary};
  line-height: 25px;
`;

export const BackButton = styled.TouchableOpacity`
  top: 0;
  left: 0;
  padding: 16px;
  align-self: flex-start;
`;
