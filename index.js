import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { PerformanceMonitor } from 'react-native-performance-monitor';

const CPUMonitoring = () => {
  const [cpuLoad, setCpuLoad] = useState(0);

  useEffect(() => {
    PerformanceMonitor.addMonitor('CPU').then((monitor) => {
      monitor.onChange((load) => setCpuLoad(load));
    });
  }, []);

  return (
    <View>
      <Text>{`CPU Load: ${cpuLoad}%`}</Text>
    </View>
  );
};

export default CPUMonitoring;