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

import UserContext from "../../contexts/UserContext";
import theme from "../../global/styles/theme";
import WaterModal from "../../components/WaterModal";
import { CongratulationModal } from "../../components/CongratulationModal";
import { MainHeader } from "../../components/MainHeader";
import {
  Container,
  FooterContainer,
  FooterButton,
  AbsoluteCircle,
  WavesSvg,
  width,
  height,
} from "./styles";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(WavesSvg);

export function Main() {
  const [percentage, setPercentage] = useState(0);
  const [ml, setMl] = useState(0);
  const [waveAnimatedValue, setWaveAnimatedValue] = useState(0);
  const [heightAnimatedValue, setHeightAnimatedValue] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalShow, setmodalShow] = useState(false);

  const { goal, user } = useContext(UserContext);

  const heightAnimated = useSharedValue(100);
  const waveAnimated = useSharedValue(5);
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
      try {
        const heightAnimatedValue = await AsyncStorage.getItem(
          `${user?.id}:heightAnimatedValue`
        );
        const waveAnimatedValue = await AsyncStorage.getItem(
          `${user?.id}:waveAnimatedValue`
        );
        const mlAnimatedValue = await AsyncStorage.getItem(
          `${user?.id}:mlAnimatedValue`
        );
        const percentageValue = await AsyncStorage.getItem(
          `${user?.id}:percentageValue`
        );

        heightAnimated.value = heightAnimatedValue
          ? parseFloat(heightAnimatedValue)
          : 100;

        waveAnimated.value = waveAnimatedValue
          ? parseFloat(waveAnimatedValue)
          : 5;
        setMl(parseFloat(mlAnimatedValue ?? "0"));
        setPercentage(parseFloat(percentageValue ?? "0"));
      } catch (error) {
        console.log("Falha ao executar a animação!", error);
        throw error;
      }
    };

    loadAnimationState();
  }, [user?.id]);

  useEffect(() => {
    const saveAnimationState = async () => {
      try {
        await AsyncStorage.setItem(
          `${user?.id}:heightAnimatedValue`,
          heightAnimated.value.toString()
        );
        await AsyncStorage.setItem(
          `${user?.id}:waveAnimatedValue`,
          waveAnimated.value.toString()
        );
        await AsyncStorage.setItem(
          `${user?.id}:mlAnimatedValue`,
          ml.toString()
        );
        await AsyncStorage.setItem(
          `${user?.id}:percentageValue`,
          percentage.toString()
        );
      } catch (error) {
        console.log("Falha ao salvar os dados!", error);
      }
    };
    setTimeout(() => {
      saveAnimationState();
    }, 1000);
  }, [user?.id, heightAnimated.value, waveAnimated.value, ml, percentage]);

  const resetValuesAtMidnight = async () => {
    console.log("Resetando valores...");
    await AsyncStorage.removeItem(`${user?.id}_waveAnimatedValue`);
    await AsyncStorage.removeItem(`${user?.id}_heightAnimatedValue`);
    await AsyncStorage.removeItem(`${user?.id}_mlAnimatedValue`);
    await AsyncStorage.removeItem(`${user?.id}_percentageValue`);
    setMl(0);
    setPercentage(0);
    setWaveAnimatedValue((waveAnimated.value = 5));
    setHeightAnimatedValue((heightAnimated.value = 100));
  };

  const setMidnightTimeout = () => {
    // const midnight = moment().set({
    // //   hour: 14,
    // //   minute: 39,
    // //   second: 0,
    // //   millisecond: 0,
    // // });
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

  useEffect(() => {
    if (goal === null) return;

    const progress = ml / goal;
    const height = progress * 900 + 100;

    heightAnimated.value = withTiming(height, {
      duration: 1000,
      easing: Easing.ease,
    });
    setHeightAnimatedValue(heightAnimated.value);

    setPercentage(Math.floor(progress * 100));
  }, [ml, goal]);

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
    setWaveAnimatedValue(waveAnimated.value);

    if (mlToAdd === null) {
      return;
    }

    setMl(ml + mlToAdd);

    if (goal === null) {
      return;
    }
    const progress = (ml + mlToAdd) / goal;
    const height = progress * 900 + 100;

    heightAnimated.value = withTiming(height, {
      duration: 1000,
      easing: Easing.ease,
    });
    setHeightAnimatedValue(heightAnimated.value);

    setPercentage(Math.floor(progress * 100));

    setTimeout(() => {
      setModalVisible(false);
    }, 250);

    if (progress >= 1 && !isModalVisible && !modalShow) {
      setTimeout(() => {
        setIsModalVisible(true);
        setmodalShow(true);
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
        ml={percentage === 0 ? 0 : Math.trunc(ml)}
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
