import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

function WhishlistScreen() {
  const dataList = useSelector((state) => state.userReducer.whishList);
  console.log(dataList);

  return (
    <GestureHandlerRootView>
      <PanGestureHandler>
        <View>
          {dataList?.length > 0 ? (
            <FlatList
              data={dataList}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderRadius: 10,
                    marginBottom: 5,
                    padding: 5,
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
                    MaxTemp:{item.maxTemp}
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
                    MinTemp:{item.minTemp}
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
                    Humidity:{item.humidity}
                  </Text>
                </View>
              )}
            />
          ) : null}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

export default WhishlistScreen;
