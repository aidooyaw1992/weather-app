import { Box } from "@/components/Box";
import { StyledText } from "@/components/StyledText";
import { Appearance, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colorScheme = Appearance.getColorScheme()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={colorScheme == 'light' ? 'light-content' : 'dark-content'} />
      <Box flex={1} justifyContent="center" alignItems="center" >
        <StyledText>Edit app/index.tsx to edit this screen.</StyledText>
      </Box>
    </SafeAreaView>
  );
}
