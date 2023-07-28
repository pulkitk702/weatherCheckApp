import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
} from "react-native-gesture-handler";
import axios from "axios";
import BottomSheet from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { setRemove, setWhishList } from "../../redux/action";

function ListScreen() {
  const cities = ["DehraDun", "Rishikesh", "Delhi", "Noida", "Bengaluru"];
  const ApiKey = "c16d6d94ff0054fbdc5f07a80060c8e9";
  const [showCities, setShowCities] = useState([]);
  const [bottomSheetCheck, setBottomSheetCheck] = useState(false);
  const [tempData, setTempData] = useState({
    name: "",
    minTemp: "",
    maxTemp: "",
    humidity: "",
  });

  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const snapPoints = useMemo(() => ["25%", "80%"], []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
    if (index == 0) {
      setBottomSheetCheck(() => false);
    }
  }, []);
  useEffect(() => {
    cities.map(
      async (item) =>
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${item}&appid=${ApiKey}`
          )
          .then((response) =>
            setShowCities((prev) => [...prev, { ...response.data }])
          )
          .catch((err) => console.log("err", err.response))
    );
  }, []);

  return (
    <GestureHandlerRootView>
      <View
        style={{
          zIndex: 100,
        }}
      >
        {showCities.length > 0 ? (
          <View>
            <FlatList
              data={showCities}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderRadius: 10,
                    marginBottom: 5,
                    padding: 5,
                  }}
                  onPress={() => {
                    setTempData({
                      name: item.name,
                      minTemp: item.main.temp_min,
                      maxTemp: item.main.temp_max,
                      humidity: item.main.humidity,
                    });
                    setBottomSheetCheck(() => true);
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Manrope",
                      fontSize: 18,
                      fontWeight: "600",
                      lineHeight: 20,
                      letterSpacing: 0,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Manrope",
                      fontSize: 18,
                      fontWeight: "600",
                      lineHeight: 20,
                      letterSpacing: 0,
                    }}
                  >
                    {item.main.temp}
                  </Text>
                </Pressable>
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        ) : null}
      </View>
      <PanGestureHandler>
        <View style={styles.container}>
          {bottomSheetCheck ? (
            <BottomSheet
              ref={bottomSheetRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
            >
              {tempData ? (
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                      width: "90%",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Manrope",
                        fontSize: 15,
                        fontWeight: "600",
                        lineHeight: 20,
                        letterSpacing: 0,
                      }}
                    >
                      MaxTemp: {tempData.maxTemp}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Manrope",
                        fontSize: 15,
                        fontWeight: "600",
                        lineHeight: 20,
                        letterSpacing: 0,
                      }}
                    >
                      MinTemp: {tempData.minTemp}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Manrope",
                        fontSize: 15,
                        fontWeight: "600",
                        lineHeight: 20,
                        letterSpacing: 0,
                        textAlign: "left",
                      }}
                    >
                      Humidity: {tempData.humidity}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignSelf: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Pressable
                      style={{
                        alignSelf: "center",
                        marginTop: 10,
                        backgroundColor: "#6C7FD8",
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                      }}
                      onPress={() => {
                        dispatch(setWhishList(tempData));
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Manrope",
                          fontSize: 20,
                          fontWeight: "800",
                          lineHeight: 34,
                          letterSpacing: 0,
                          textAlign: "left",
                          color: "white",
                        }}
                      >
                        Add
                      </Text>
                    </Pressable>

                    <Pressable
                      style={{
                        alignSelf: "center",
                        marginTop: 10,
                        marginLeft: 20,
                        backgroundColor: "#6C7FD8",
                        borderRadius: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                      }}
                      onPress={() => {
                        dispatch(setRemove(tempData));
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Manrope",
                          fontSize: 20,
                          fontWeight: "800",
                          lineHeight: 34,
                          letterSpacing: 0,
                          textAlign: "left",
                          color: "white",
                        }}
                      >
                        Remove
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <View>
                  <Text>NO Data</Text>
                </View>
              )}
            </BottomSheet>
          ) : null}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: "180%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default ListScreen;
