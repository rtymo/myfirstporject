import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Home",
          headerStyle: {
            backgroundColor: "#E1D5E7",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",

        }} 
      />
      <Stack.Screen 
        name="screens/addDiary" 
        options={{ 
          title: "Add Diary",
          presentation: "modal",
          headerShown: false,
          
        }} 
      />
      <Stack.Screen 
        name="screens/diary" 
        options={{ 
          title: "Diary",
          headerShown: false,
        }} 
      />
    </Stack>
  );
}
