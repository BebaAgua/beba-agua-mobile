import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
  email: string;
  weight: number;
  age: number;
  token: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  goal: number | null;
  setGoal: (goal: number | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  goal: null,
  setGoal: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [goal, setGoal] = useState<number | null>(null);

  useEffect(() => {
    async function loadUserFromStorage() {
      const token = await AsyncStorage.getItem("token");
      const userString = await AsyncStorage.getItem("user");

      if (token && userString) {
        const user = JSON.parse(userString);
        user.token = token;
        setUser(user);
      }

      const goalString = await AsyncStorage.getItem("goal");

      if (goalString) {
        const goal = JSON.parse(goalString);
        setGoal(goal);
      }
    }

    loadUserFromStorage();
  }, [setGoal]);

  return (
    <UserContext.Provider value={{ user, setUser, goal, setGoal }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
