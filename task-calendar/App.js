import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Mar.",
    "Abr.",
    "May.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dic."
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ],
  dayNamesShort: [
    "Dom",
    "Lun",
    "Mar",
    "Mié",
    "Jue",
    "Vie",
    "Sáb"
  ],
  today: "Hoy"
};

LocaleConfig.defaultLocale = "es";

export default function App() {
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day) => {
    const date = day.dateString;

    setMarkedDates((prev) => {
      const newMarked = { ...prev };

      // si ya está marcado → lo quitamos
      if (newMarked[date]) {
        delete newMarked[date];
      } else {
        // si no está → lo marcamos en verde
        newMarked[date] = {
          selected: true,
          selectedColor: 'green',
        };
      }

      return newMarked;
    });
  };


  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aplicación de Tareas</Text>

      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        style={styles.calendar}
        renderToHardwareTextureAndroid
      />

      <StatusBar style="light" />
    </View>
)}

const styles = StyleSheet.create({
  container:{
    paddingTop:"40",
    justifyContent:"center"
  },
  calendar:{
    borderRadius:10,
    backgroundColor:"green"

  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18, // 🔵 círculo
    borderWidth: 1,
    borderColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  circleActive: {
    backgroundColor: "#37ff00",
    borderColor: "#37ff00"
  },
  text: {
    color: "#060000",
  }
});
