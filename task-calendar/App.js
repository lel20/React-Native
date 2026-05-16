import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from "react";
import { Calendar } from 'react-native-calendars';
import './calendarLocale';
export default function App() {
  //Obtenemos la fecha de hoy
  const today = new Date().toISOString().split('T')[0];
  //Se crean 2 variables. Una para guardar el estado actual (en este caso un 
  // objeto vacio) y otra para actualizar dicho estado (mediante una función)
  const [markedDates, setMarkedDates] = useState({});
  const [eventText, setEventText] = useState('');
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  //Se crea una funcion flecha que se ejecuta cada vez que se preciona un <<día>> selecionado
  const onDayPress = (date) => {
    //permite actualizar el estado actual
    setMarkedDates((prev) => {
      //Se alamacena el valor anterior de --prev-- La primera vez vale su valor es prev={}     
      const previousDay = { ...prev };
      //Si existe dicho valor (clave)) se lo borra
      if (previousDay[date]) {
        delete previousDay[date];
        //si no existe dicho valor se le coloca un true
      } else {
        previousDay[date] = true;
      }
      //retornamos el valor para que se actualice
      return previousDay;
    });
  };

  return (
    <View style={styles.container}>
      <Calendar firstDay={1} style={styles.container_calendar}
        //función que permite estilizaciones personalisadas. Esta recibe un objeto 
        // con varias propiedades (información de la fecha, estado)
        dayComponent={({ date, state }) => {
          //se almacena un boleano 
          const isToday = date.dateString === today;
          console.log(isToday)
          //Si no existe el objeto se retorna un null
          if (!date) return null;
          //Si la fecha exite se coloca un true en isMarked caso contraio un false
          const isMarked = !!markedDates[date.dateString];
          return (
            <Pressable
              onPress={() => onDayPress(date.dateString)}
              android_ripple={{ color: 'transparent' }}
            >
              <View
                style={[
                  styles.dayBox,
                  isToday, //&& styles.backText,
                  isMarked && styles.dayBoxMarked,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    state === 'disabled' && styles.disabledText,
                    isMarked && styles.markedText,
                    isToday && styles.todayText

                  ]}
                >
                  {date.day}

                </Text>
              </View>
            </Pressable>
          );
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
  container_calendar: {
    backgroundColor: '#037a0b',


  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },

  dayBox: {
    width: 38,
    height: 38,
    borderWidth: 1,
    borderColor: 'rgba(165, 165, 165, 0.25)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  dayBoxMarked: {
    backgroundColor: 'green',
    borderColor: 'green',
  },

  dayText: {
    color: '#333',
    fontSize: 14,
    fontWeight: "bold"
  },

  markedText: {
    color: 'white',
  },

  disabledText: {
    opacity: 0.4,
  }, todayText: {
    color: '#ea9103',
    fontWeight: '900',
    fontSize: 15
  },
  //backText:{
  //  backgroundColor:'rgb(0, 166, 255)'
  // }
});