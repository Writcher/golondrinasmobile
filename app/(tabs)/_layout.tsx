import { Tabs } from 'expo-router';
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { HapticTab } from '@/components/tab/hapticTab';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#F59E0B",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: "10%",
          backgroundColor: "#1a202c",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="reservations"
        options={{
          title: 'Reservas',
          tabBarIcon: ({ color }) => <Entypo name="list" size={24} color={color} />
        }}
      />
    </Tabs>
  );
}
