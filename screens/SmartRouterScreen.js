
// SmartRouter.js
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SmartRouter = () => {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: 'Fastest Route',
      duration: '15 mins',
      distance: '8.2 km',
      traffic: 'light',
      savings: '5 mins',
      type: 'fastest'
    },
    {
      id: 2,
      name: 'Eco Route',
      duration: '18 mins',
      distance: '7.8 km',
      traffic: 'moderate',
      savings: '12% fuel',
      type: 'eco'
    },
    {
      id: 3,
      name: 'Avoid Highways',
      duration: '22 mins',
      distance: '9.1 km',
      traffic: 'light',
      savings: 'less stress',
      type: 'scenic'
    }
  ]);

  const [selectedRoute, setSelectedRoute] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛣️ Smart Route Options</Text>
      
      {routes.map(route => (
        <TouchableOpacity
          key={route.id}
          style={[
            styles.routeCard,
            selectedRoute === route.id && styles.selectedRoute
          ]}
          onPress={() => setSelectedRoute(route.id)}
        >
          <View style={styles.routeHeader}>
            <Text style={styles.routeName}>{route.name}</Text>
            <View style={[
              styles.trafficBadge,
              { backgroundColor: route.traffic === 'light' ? '#10b981' : '#f59e0b' }
            ]}>
              <Text style={styles.trafficText}>{route.traffic}</Text>
            </View>
          </View>
          
          <View style={styles.routeDetails}>
            <Text style={styles.duration}>⏱️ {route.duration}</Text>
            <Text style={styles.distance}>📏 {route.distance}</Text>
            <Text style={styles.savings}>💰 {route.savings}</Text>
          </View>
          
          {selectedRoute === route.id && (
            <View style={styles.selectedIndicator}>
              <Text style={styles.selectedText}>✅ Selected</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.navigateButton}>
        <Text style={styles.navigateButtonText}>🚗 Start Navigation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1f2937',
  },
  routeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedRoute: {
    borderColor: '#3b82f6',
    backgroundColor: '#f0f9ff',
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  routeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  trafficBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trafficText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  duration: {
    fontSize: 14,
    color: '#6b7280',
  },
  distance: {
    fontSize: 14,
    color: '#6b7280',
  },
  savings: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  selectedIndicator: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#3b82f6',
    alignItems: 'center',
  },
  selectedText: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  navigateButton: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  navigateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SmartRouter;