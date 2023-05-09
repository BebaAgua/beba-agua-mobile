import Animated, {
  useAnimatedProps,
  useSharedValue,
  interpolate,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

import { useContext, useEffect, useState } from "react";
import moment from "moment";

import { StatusBar } from "react-native";
import { Circle, Path } from "react-native-svg";
import { Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import theme from "../../global/styles/theme";
import { MainHeader } from "../../components/MainHeader";
import {
  Container,
  FooterContainer,
  FooterButton,
  AbsoluteCircle,
  WavesSvg,
  width,
} from "./styles";
import UserContext from "../../contexts/UserContext";
import WaterModal from "../../components/WaterModal";
import { CongratulationModal } from "../../components/CongratulationModal";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(WavesSvg);

export function Main() {
  const [percentage, setPercentage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalShown, setmodalShown] = useState(false);

  const { goal } = useContext(UserContext);

  const heightAnimated = useSharedValue(100);
  const waveAnimated = useSharedValue(5);
  const mlAnimated = useSharedValue(0);
  const buttonBorderAnimated = useSharedValue(0);
  const buttonProps = useAnimatedProps(() => {
    return {
      cx: 60,
      cy: 60,
      r: 40,
      strokeWidth: interpolate(
        buttonBorderAnimated.value,
        [0, 0.5, 1],
        [17, 40, 17]
      ),
    };
  });

  const svgContainerProps = useAnimatedProps(() => {
    return {
      width,
      height: heightAnimated.value,
      viewBox: `0 0 ${width} ${heightAnimated.value}`,
    };
  });

  const firstWaveProps = useAnimatedProps(() => {
    return {
      d: `
        M 0 0
        Q 45 ${waveAnimated.value} 90 0
        T 180 0
        T 270 0
        T 360 0
        T 900 0
        T 540 0
        V ${heightAnimated.value}
        H 0
        Z
      `,
    };
  });

  const secondWaveProps = useAnimatedProps(() => {
    return {
      d: `
      M 0 0
      Q 35 ${waveAnimated.value + 5} 70 0
      T 140 0
      T 210 0
      T 280 0
      T 350 0
      T 420 0
      V ${heightAnimated.value}
      H 0
      Z
    `,
    };
  });

  useEffect(() => {
    const loadAnimationState = async () => {
      const heightAnimatedValue = await AsyncStorage.getItem(
        "heightAnimatedValue"
      );
      const waveAnimatedValue = await AsyncStorage.getItem("waveAnimatedValue");
      const mlAnimatedValue = await AsyncStorage.getItem("mlAnimatedValue");
      const percentageValue = await AsyncStorage.getItem("percentageValue");

      heightAnimated.value = heightAnimatedValue
        ? parseFloat(heightAnimatedValue)
        : 100;
      waveAnimated.value = waveAnimatedValue
        ? parseFloat(waveAnimatedValue)
        : 5;
      mlAnimated.value = mlAnimatedValue ? parseFloat(mlAnimatedValue) : 0;
      setPercentage(parseFloat(percentageValue ?? "0"));
    };

    loadAnimationState();
  }, []);

  useEffect(() => {
    const saveAnimationState = async () => {
      setTimeout(async () => {
        await AsyncStorage.setItem(
          "heightAnimatedValue",
          heightAnimated.value.toString()
        );
        await AsyncStorage.setItem(
          "waveAnimatedValue",
          waveAnimated.value.toString()
        );
        await AsyncStorage.setItem(
          "mlAnimatedValue",
          mlAnimated.value.toString()
        );
        await AsyncStorage.setItem("percentageValue", percentage.toString());
      }, 2000);
    };

    saveAnimationState();
  }, [
    heightAnimated.value,
    waveAnimated.value,
    mlAnimated.value,
    setPercentage,
  ]);

  const resetValuesAtMidnight = async () => {
    console.log("Resetando valores...");
    await AsyncStorage.removeItem("heightAnimatedValue");
    await AsyncStorage.removeItem("waveAnimatedValue");
    await AsyncStorage.removeItem("mlAnimatedValue");
    await AsyncStorage.removeItem("percentageValue");
  };

  const setMidnightTimeout = () => {
    const now = moment();
    const midnight = moment().endOf("day");
    const timeUntilMidnight = midnight.diff(now);

    if (now.isBefore(midnight)) {
      setTimeout(() => {
        resetValuesAtMidnight();
        setMidnightTimeout();
      }, timeUntilMidnight);
    }
  };

  useEffect(() => {
    setMidnightTimeout();
  }, []);

  function handleDrink(mlToAdd: number | null) {
    buttonBorderAnimated.value = withTiming(1, {
      duration: 500,
      easing: Easing.ease,
    });

    setModalVisible(true);

    buttonBorderAnimated.value = 0;
    waveAnimated.value = 5;

    waveAnimated.value = withRepeat(
      withTiming(17, {
        duration: 500,
        easing: Easing.ease,
      }),
      2,
      true
    );

    if (mlToAdd === null) {
      return;
    }

    mlAnimated.value = withTiming(mlAnimated.value + mlToAdd, {
      duration: 200,
      easing: Easing.ease,
    });

    if (goal === null) {
      return;
    }
    const progress = (mlAnimated.value + mlToAdd) / goal;
    const height = progress * 900 + 100;

    heightAnimated.value = withTiming(height, {
      duration: 1000,
      easing: Easing.ease,
    });
    setPercentage(Math.floor(progress * 100));

    setTimeout(() => {
      setModalVisible(false);
    }, 250);

    if (progress >= 1 && !isModalVisible && !modalShown) {
      setTimeout(() => {
        setIsModalVisible(true);
        setmodalShown(true);
      }, 1000);
    }
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <CongratulationModal
        visible={isModalVisible}
        onClose={handleCloseModal}
      />
      <WaterModal visible={modalVisible} onDrink={handleDrink} />
      <MainHeader
        ml={percentage === 0 ? 0 : Math.trunc(mlAnimated.value)}
        percents={percentage}
      />
      <AnimatedSvg animatedProps={svgContainerProps}>
        <AnimatedPath
          animatedProps={firstWaveProps}
          fill={theme.colors.secondary}
          transform="translate(0, 10)"
        />

        <AnimatedPath
          animatedProps={secondWaveProps}
          fill={theme.colors.waves}
          transform="translate(0, 15)"
        />
      </AnimatedSvg>
      <FooterContainer>
        <FooterButton onPress={() => handleDrink(null)}>
          <AbsoluteCircle width={120} height={120}>
            <AnimatedCircle
              animatedProps={buttonProps}
              fill={theme.colors.border}
              stroke={theme.colors.secondary}
              strokeOpacity={0.8}
            />
          </AbsoluteCircle>
          <Fontisto name="blood-drop" size={40} color={theme.colors.shape} />
        </FooterButton>
      </FooterContainer>
    </Container>
  );
}
