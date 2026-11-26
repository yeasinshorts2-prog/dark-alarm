
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

import AddAlarmScreen from './src/screens/AddAlarmScreen';

type Alarm = {
  id: number;
  time: string;
  label: string;
  days: string[];
  enabled: boolean;
};

export default function App() {
  const [showAdd, setShowAdd] = useState(false);

  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: 1,
      time: '06:00',
      label: 'Wake Up',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      enabled: true,
    },
    {
      id: 2,
      time: '07:30',
      label: 'Morning Routine',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      enabled: true,
    },
  ]);

  const toggleAlarm = (id: number) => {
    setAlarms(old =>
      old.map(a =>
        a.id === id ? { ...a, enabled: !a.enabled } : a
      )
    );
  };

  const deleteAlarm = (id: number) => {
    setAlarms(old => old.filter(a => a.id !== id));
  };

  const saveAlarm = (data: {
    time: string;
    label: string;
    days: string[];
  }) => {
    setAlarms(old => [
      ...old,
      {
        id: Date.now(),
        ...data,
        enabled: true,
      },
    ]);
    setShowAdd(false);
  };

  if (showAdd) {
    return (
      <AddAlarmScreen
        onSave={saveAlarm}
        onCancel={() => setShowAdd(false)}
      />
    );
  }

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
        <Text style={styles.clockLabel}>YOUR ALARMS</Text>
        <Text style={styles.clockTime}>
          {alarms.filter(a => a.enabled).length}
        </Text>
        <Text style={styles.clockDescription}>
          Active alarms
        </Text>
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

              <Text style={styles.alarmLabel}>
                {alarm.label}
              </Text>

              <Text style={styles.alarmDays}>
                {alarm.days.length
                  ? alarm.days.join(' · ')
                  : 'Once'}
              </Text>
            </View>

            <View style={styles.alarmActions}>
              <Switch
                value={alarm.enabled}
                onValueChange={() => toggleAlarm(alarm.id)}
                trackColor={{
                  false: '#343442',
                  true: '#7655F6'
                }}
                thumbColor="#FFFFFF"
              />

              <TouchableOpacity
                onPress={() => deleteAlarm(alarm.id)}
              >
                <Text style={styles.delete}>×</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {alarms.length === 0 && (
          <Text style={styles.empty}>
            No alarms yet. Create your first alarm!
          </Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAdd(true)}
      >
        <Text style={styles.addText}>
          ＋ Add New Alarm
        </Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        DARK ALARM · YOUR TIME, YOUR LIFE
      </Text>
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
  empty: {
    color: '#999',
    textAlign: 'center',
    marginTop: 30,
  },
  footer: {
    color: '#555267',
    textAlign: 'center',
    fontSize: 9,
    letterSpacing: 2,
    marginBottom: 12,
  },
});
