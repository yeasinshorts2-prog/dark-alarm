
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';

type Alarm = {
  id: number;
  time: string;
  label: string;
  days: string;
  enabled: boolean;
};

export default function App() {
  const [alarms, setAlarms] = useState<Alarm[]>([
    { id: 1, time: '06:00', label: 'Wake Up', days: 'Every day', enabled: true },
    { id: 2, time: '07:30', label: 'Morning Routine', days: 'Mon - Fri', enabled: true },
    { id: 3, time: '09:00', label: 'Reminder', days: 'Sunday', enabled: false },
  ]);

  const toggleAlarm = (id: number) => {
    setAlarms(previous =>
      previous.map(alarm =>
        alarm.id === id
          ? { ...alarm, enabled: !alarm.enabled }
          : alarm
      )
    );
  };

  const deleteAlarm = (id: number) => {
    setAlarms(previous => previous.filter(alarm => alarm.id !== id));
  };

  const addAlarm = () => {
    const id = Date.now();
    setAlarms(previous => [
      ...previous,
      {
        id,
        time: '08:00',
        label: 'New Alarm',
        days: 'Once',
        enabled: true,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090F" />

      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>GOOD DAY</Text>
          <Text style={styles.heading}>My Alarms</Text>
        </View>
        <View style={styles.profile}>
          <Text style={styles.profileText}>A</Text>
        </View>
      </View>

      <View style={styles.clockCard}>
        <Text style={styles.clockLabel}>NEXT ALARM</Text>
        <Text style={styles.clockTime}>06:00 AM</Text>
        <Text style={styles.clockDescription}>
          Tomorrow morning · Wake up fresh
        </Text>
        <View style={styles.progress}>
          <View style={styles.progressFill} />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Alarms</Text>
        <Text style={styles.count}>{alarms.length} ALARMS</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {alarms.map(alarm => (
          <View key={alarm.id} style={styles.alarmCard}>
            <View style={styles.alarmInfo}>
              <Text style={[
                styles.alarmTime,
                !alarm.enabled && styles.disabledText
              ]}>
                {alarm.time}
              </Text>
              <Text style={styles.alarmLabel}>{alarm.label}</Text>
              <Text style={styles.alarmDays}>{alarm.days}</Text>
            </View>

            <View style={styles.alarmActions}>
              <Switch
                value={alarm.enabled}
                onValueChange={() => toggleAlarm(alarm.id)}
                trackColor={{ false: '#343442', true: '#7655F6' }}
                thumbColor="#FFFFFF"
              />
              <TouchableOpacity onPress={() => deleteAlarm(alarm.id)}>
                <Text style={styles.delete}>×</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={addAlarm}>
        <Text style={styles.addText}>＋  Add New Alarm</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>DARK ALARM · YOUR TIME, YOUR LIFE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090F',
    paddingHorizontal: 22,
    paddingTop: 55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  subtitle: {
    color: '#8C7BFF',
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: 'bold',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
  },
  profile: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#7655F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  clockCard: {
    backgroundColor: '#191725',
    borderRadius: 23,
    padding: 23,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#302747',
  },
  clockLabel: {
    color: '#A99AFF',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  clockTime: {
    color: '#FFFFFF',
    fontSize: 43,
    fontWeight: 'bold',
    marginTop: 13,
  },
  clockDescription: {
    color: '#A6A3B5',
    fontSize: 12,
    marginTop: 8,
  },
  progress: {
    height: 5,
    backgroundColor: '#393349',
    borderRadius: 5,
    marginTop: 23,
  },
  progressFill: {
    width: '65%',
    height: 5,
    backgroundColor: '#957BFF',
    borderRadius: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  count: {
    color: '#8B83A6',
    fontSize: 10,
    letterSpacing: 1,
  },
  alarmCard: {
    backgroundColor: '#15151F',
    borderRadius: 17,
    padding: 17,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#242432',
  },
  alarmInfo: {
    flex: 1,
  },
  alarmTime: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#666675',
  },
  alarmLabel: {
    color: '#C5C1D4',
    fontSize: 13,
    marginTop: 5,
  },
  alarmDays: {
    color: '#77738A',
    fontSize: 11,
    marginTop: 5,
  },
  alarmActions: {
    alignItems: 'center',
    gap: 10,
  },
  delete: {
    color: '#FF647C',
    fontSize: 26,
  },
  addButton: {
    backgroundColor: '#7655F6',
    borderRadius: 17,
    padding: 17,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 15,
  },
  addText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  footer: {
    color: '#555267',
    textAlign: 'center',
    fontSize: 9,
    letterSpacing: 2,
    marginBottom: 12,
  },
});
