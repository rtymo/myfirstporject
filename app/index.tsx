import { SafeAreaView, StyleSheet, View } from "react-native";
import { theme } from "./constants/theme";
import { Home } from "./screens/home";

const App = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Home />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: theme.common.safeContainer,
  container: theme.common.container,
});export default App;
