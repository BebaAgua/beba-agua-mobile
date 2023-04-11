import styled from "styled-components/native";

export const ErrorModal = styled.Modal``;

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
  color: #2196f3;
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
`;

export const ViewContainer = styled.View`
  background-color: #f8f8ff;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const TextError = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  color: #333766;
  align-items: center;
  text-align: center;
`;
