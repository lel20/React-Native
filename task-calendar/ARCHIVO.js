import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from "react";
import { Calendar, LocaleConfig } from 'react-native-calendars';

/* 🌍 ESPAÑOL */
LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ],
  monthNamesShort: [
    "Ene.","Feb.","Mar.","Abr.","May.","Jun.",
    "Jul.","Ago.","Sep.","Oct.","Nov.","Dic."
  ],
  dayNames: [
    "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"
  ],
  dayNamesShort: ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],
  today: "Hoy"
};

LocaleConfig.defaultLocale = "es";

export default function App() {
  const [markedDates, setMarkedDates] = useState({});

  /* 📌 Marcar / desmarcar días */
  const onDayPress = (day) => {
    const dateString = day.dateString;

    setMarkedDates((prev) => {
      const newMarked = { ...prev };

      if (newMarked[dateString]) {
        delete newMarked[dateString];
      } else {
        newMarked[dateString] = {
          customStyles: {
            container: {
              backgroundColor: 'green',
              
            },
            text: {
              color: 'white',
              backgroundColor:'white'
            },
          
          },
        };
      }

      return newMarked;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aplicación de Tareas</Text>

      <Calendar
      enableSwipeMonths={true}
disableAllTouchEventsForDisabledDays={false}
         markingType="custom"
  markedDates={markedDates}
  onDayPress={onDayPress}

      
      theme={{
        backgroundColor: 'rgb(255, 255, 255)',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: 'red',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#000000',
        'stylesheet.day.basic': {
    base: {
      borderWidth: 1,
      borderColor: 'rgba(150,150,150,0.25)',
      borderRadius: 100,
      width: 38,
      height: 38,
      justifyContent: 'center',
      alignItems: 'center',
      text:''
    },
  },
      }}
      />

      <StatusBar style="dark" />
    </View>
  );
}

/* 🎨 ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },

  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});