
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AddAlarmScreen() {
  const [hour, setHour] = useState('06');
  const [minute, setMinute] = useState('30');
  const [label, setLabel] = useState('Wake Up');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setSelectedDays(old =>
      old.includes(day)
        ? old.filter(item => item !== day)
        : [...old, day]
    );
  };

  const saveAlarm = () => {
    alert(
      `Alarm: ${hour}:${minute}\nLabel: ${label}\nDays: ${
        selectedDays.join(', ') || 'Once'
      }`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>New Alarm</Text>
      <Text style={styles.subtitle}>CREATE YOUR PERFECT ROUTINE</Text>

      <View style={styles.timeCard}>
        <Text style={styles.label}>ALARM TIME</Text>

        <View style={styles.timeRow}>
          <TextInput
            style={styles.timeInput}
            value={hour}
            onChangeText={setHour}
            keyboardType="number-pad"
            maxLength={2}
            selectTextOnFocus
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.timeInput}
            value={minute}
            onChangeText={setMinute}
            keyboardType="number-pad"
            maxLength={2}
            selectTextOnFocus
          />
        </View>
      </View>

      <Text style={styles.section}>Alarm Name</Text>
      <TextInput
        style={styles.input}
        value={label}
        onChangeText={setLabel}
        placeholder="Enter alarm name"
        placeholderTextColor="#777"
      />

      <Text style={styles.section}>Repeat Days</Text>

      <View style={styles.days}>
        {days.map(day => (
          <TouchableOpacity
            key={day}
            onPress={() => toggleDay(day)}
            style={[
              styles.day,
              selectedDays.includes(day) && styles.selectedDay,
            ]}
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveAlarm}
      >
        <Text style={styles.saveText}>Save Alarm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090F',
    padding: 22,
    paddingTop: 55,
  },
  heading: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#957BFF',
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 7,
    marginBottom: 30,
  },
  timeCard: {
    backgroundColor: '#191725',
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#302747',
  },
  label: {
    color: '#A99AFF',
    fontSize: 11,
    letterSpacing: 2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  timeInput: {
    color: '#FFF',
    fontSize: 55,
    fontWeight: 'bold',
    minWidth: 85,
    textAlign: 'center',
  },
  colon: {
    color: '#957BFF',
    fontSize: 45,
  },
  section: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 13,
  },
  input: {
    backgroundColor: '#191925',
    borderRadius: 13,
    padding: 17,
    color: '#FFF',
    fontSize: 15,
  },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  day: {
    backgroundColor: '#191925',
    width: 42,
    height: 42,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDay: {
    backgroundColor: '#7655F6',
  },
  dayText: {
    color: '#FFF',
    fontSize: 11,
  },
  saveButton: {
    backgroundColor: '#7655F6',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 35,
  },
  saveText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
