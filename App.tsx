import { BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Button, FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { SceneMap, TabView } from 'react-native-tab-view';
import React from 'react';

const snapPoints = ['10%', '50%', '95%'];

const routes = [
  { key: 'first', title: 'Tab 1' },
  { key: 'second', title: 'Tab 2' },
  { key: 'third', title: 'Tab 3' },
  { key: 'fourth', title: 'Tab 4' },
];

const data = Array(100).fill(null).map((_, index) => index);

function keyExtractor(item) {
  return item.toString();
}

function renderItem({ item }) {
  return (
    <Text style={styles.text}>item: {item}</Text>
  );
}

const FirstRoute = () => (
  <Text style={styles.text}>First route</Text>
);

const SecondRoute = () => (
  <View style={styles.flex}>
    <Text style={styles.title}>Using BottomSheetFlatList</Text>
    <BottomSheetFlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  </View>
);

const ThirdRoute = () => (
  <View style={styles.flex}>
    <Text style={styles.title}>Using FlatList</Text>
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  </View>
);

const FourthRoute = () => (
  <Text style={styles.text}>Fourth route</Text>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

export default function App() {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const dimensions = useWindowDimensions();

  const onPressButton = React.useCallback(() => {
    if (isBottomSheetVisible) {
      bottomSheetModalRef.current?.close();
    } else {
      bottomSheetModalRef.current?.present();
    }
    setIsBottomSheetVisible(!isBottomSheetVisible);
  }, [isBottomSheetVisible]);

  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <GestureHandlerRootView style={styles.flex}>
          <SafeAreaView style={styles.flex}>
            <Button
              title="Toggle"
              color="red"
              onPress={onPressButton}
            />
            <BottomSheetModal
              index={1}
              ref={bottomSheetModalRef}
              snapPoints={snapPoints}
            >
              <TabView
                initialLayout={{ width: dimensions.width }}
                navigationState={{ index: tabIndex, routes }}
                onIndexChange={setTabIndex}
                renderScene={renderScene}
              />
            </BottomSheetModal>
          </SafeAreaView>
        </GestureHandlerRootView>
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  text: {
    color: 'black',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
