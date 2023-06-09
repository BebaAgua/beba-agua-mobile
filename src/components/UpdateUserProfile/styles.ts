import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.white100};
  padding: 20px;
  border-radius: 10px;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProfileAvatar = styled.Image`
  width: 32px;
  height: 32px;
`;

export const NameText = styled.Text`
  font-size: 20px;
  margin-left: 10px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.blue600};
`;

export const ButtonWrapper = styled.View`
  align-items: center;
  margin-top: 10px;
`;

export const UpdateButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.blue800};
  padding: 5px 20px;
  border-radius: 5px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.white200};
`;

export const DescriptionText = styled.Text`
  margin-top: 10px;
  font-size: 10px;
  padding: 5px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.gray500};
`;
