import React, { useEffect, useState } from "react";

import Constants from "expo-constants";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import MapView, { MapEvent, PROVIDER_GOOGLE } from "react-native-maps";
import { DrawerScreenProps, useIsDrawerOpen } from "@react-navigation/drawer";

// TODO get this from drawer.tsx
type Props = DrawerScreenProps<{ Home: {}; Location: {} }, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [region, setRegion] = useState<
    | undefined
    | {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
      }
  >(undefined);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(
    false
  );

  // For loading the mylocation button from the get go,
  // together with onMapReady function.
  const [mapHeight, setMapHeight] = useState("99%");
  const isOpen = useIsDrawerOpen();

  const handlePoiClick = ({
    nativeEvent: { coordinate, placeId, name },
  }: MapEvent<{ placeId: string; name: string }>) => {
    navigation.navigate("Location", {
      place: { coordinate, id: placeId, name },
    });
  };

  useEffect(() => {
    const loadLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg('Permission to access location was denied');
        return;
      }
      setLocationPermissionGranted(true);

      const {
        coords: { latitude, longitude },
      } = await getCurrentPositionAsync({});
      setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    };

    loadLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={isOpen ? "light" : "dark"} />
      {locationPermissionGranted ? (
        <MapView
          loadingEnabled={true}
          onPoiClick={handlePoiClick}
          onMapReady={() => setMapHeight("100%")}
          region={region}
          showsCompass={false}
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton={true}
          showsUserLocation={true}
          style={{
            height: mapHeight,
            width: "100%",
          }}
        />
      ) : (
        <>
          <Text style={styles.centeredText}>
            Please wait while we fetch permission to access your location.
          </Text>
          <Text style={styles.centeredText}>
            If you have not granted location permissions, then this page will
            not work.
          </Text>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // TODO (saha): remove this margin to have map underlay the status bar
    // But, the problem with this is that the mylocation button seems
    // to be unmovable and gets covered in this way. Find a way to fix
    // this issue
    marginTop: Constants.statusBarHeight || 0,
  },
  centeredText: {
    textAlign: "center",
  },
});
