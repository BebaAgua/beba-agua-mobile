import { useContext, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import moment from "moment-timezone";
import { StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { DailyHeader } from "../../components/DailyHeader";
import { DrawerHeader } from "../../components/DrawerHeader";
import theme from "../../global/styles/theme";
import UserContext from "../../contexts/UserContext";
import api from "../../services/api";
import {
  AmountImage,
  AmountText,
  Container,
  CreatedAtText,
  InitialContainer,
  InitialText,
  Item,
  ItemContainer,
} from "./styles";

interface WaterIntake {
  userId: string;
  amount: number;
  createdAt: string;
}

export function DailyWaterIntake() {
  const { user } = useContext(UserContext);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [waterIntakes, setWaterIntakes] = useState<WaterIntake[]>([]);

  const resetValuesAtMidnight = () => {
    console.log("Resetando valores do Daily Water Intake");
    setWaterIntakes([]);
    setTotalAmount(0);
  };

  const setMidnightInterval = () => {
    const now = moment();
    const midnight = moment().endOf("day");
    const timeUntilMidnight = midnight.diff(now);

    setTimeout(() => {
      resetValuesAtMidnight();
    }, timeUntilMidnight);
  };
  useEffect(() => {
    const newTotalAmount = waterIntakes.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );
    setTotalAmount(newTotalAmount);
  }, [waterIntakes]);

  useEffect(() => {
    setMidnightInterval();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchWaterIntakes() {
        try {
          const startDate = moment().startOf("day");
          const endDate = moment().endOf("day");
          const response = await api.get(
            `/water-intake/${user?.id}/${startDate}/${endDate}`,
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          );

          const filteredIntakes = response.data.filter(
            (intake: WaterIntake) => {
              const intakeDate = moment(intake.createdAt);
              return intakeDate.isBetween(startDate, endDate, null, "[]");
            }
          );

          const adjustedData = filteredIntakes.map((data: WaterIntake) => ({
            ...data,
            createdAt: moment(data.createdAt).format("HH:mm"),
          }));

          adjustedData.sort((a: WaterIntake, b: WaterIntake) =>
            moment(a.createdAt, "HH:mm").diff(moment(b.createdAt, "HH:mm"))
          );

          console.log(adjustedData);

          setWaterIntakes(adjustedData);
        } catch (error) {
          console.error(error);
        }
      }

      fetchWaterIntakes();
    }, [])
  );

  if (waterIntakes.length === 0) {
    return (
      <InitialContainer>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.colors.background}
        />
        <DailyHeader ml={totalAmount} />
        <InitialText>Você ainda não ingeriu água hoje!</InitialText>
      </InitialContainer>
    );
  }

  const getImageByAmount = (amount: number) => {
    if (amount === 300) {
      return require("../../assets/icons/glass.png");
    } else {
      return require("../../assets/icons/bottle.png");
    }
  };

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      <DailyHeader ml={totalAmount} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ItemContainer>
          {waterIntakes.map((waterIntake, index) => (
            <Item key={`${index}_${waterIntake.createdAt}`}>
              <AmountImage source={getImageByAmount(waterIntake.amount)} />
              <AmountText>{waterIntake.amount} ml</AmountText>
              <CreatedAtText>{waterIntake.createdAt}</CreatedAtText>
            </Item>
          ))}
        </ItemContainer>
      </ScrollView>
    </Container>
  );
}
