import Svg from "react-native-svg";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
export const { width, height } = Dimensions.get("screen");

const windowHeight = Dimensions.get("screen").height;

export const Container = styled.View`
  flex: 1;
  position: relative;
  padding-left: 24px;
  padding-right: 24px;
  background-color: ${(props) => props.theme.colors.white200};
`;

export const FooterContainer = styled.View`
  height: 30%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const FooterButton = styled.TouchableOpacity``;

export const AbsoluteCircle = styled(Svg)`
  position: absolute;
  bottom: 0;
  align-self: center;
  margin-bottom: -40px;
`;

export const WavesSvg = styled(Svg)`
  width: ${width}px;
  position: absolute;
  max-height: ${windowHeight * 1.3}px;
  bottom: 0;
`;
