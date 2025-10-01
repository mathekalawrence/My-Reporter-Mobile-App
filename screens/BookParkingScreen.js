// screens/BookParkingScreen.js
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

{/*
import { Text, View } from 'react-native';

export default function BookParking() {
  return (
    <View>
      <Text>Book Parking Screen</Text>
    </View>
  );
} */}

const BookParkingScreen = () => {
  const [selectedCity, setSelectedCity] = useState('Nairobi');
  const [parkingLocation, setParkingLocation] = useState('');
  const [duration, setDuration] = useState(1);
  const [totalCost, setTotalCost] = useState(60);
  const [showMap, setShowMap] = useState(false);
  const [selectedParkingSpot, setSelectedParkingSpot] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [availableSpots, setAvailableSpots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Parking spots data for Nairobi
  const nairobiParkingSpots = [
    {
      id: 1,
      name: 'CBD Parking Complex',
      address: 'Moi Avenue, Nairobi CBD',
      coordinates: { latitude: -1.2921, longitude: 36.8219 },
      available: true,
      rate: 60,
      capacity: 50,
      availableSpots: 12,
    },
    {
      id: 2,
      name: 'Westlands Secure Parking',
      address: 'Westlands, Mpaka Road',
      coordinates: { latitude: -1.2684, longitude: 36.8061 },
      available: true,
      rate: 80,
      capacity: 30,
      availableSpots: 8,
    },
    {
      id: 3,
      name: 'Karen Shopping Center',
      address: 'Karen, Langata Road',
      coordinates: { latitude: -1.3192, longitude: 36.7089 },
      available: true,
      rate: 50,
      capacity: 40,
      availableSpots: 15,
    },
    {
      id: 4,
      name: 'Thika Road Mall Parking',
      address: 'Thika Road, Mall',
      coordinates: { latitude: -1.2146, longitude: 36.8853 },
      available: true,
      rate: 70,
      capacity: 100,
      availableSpots: 25,
    },
  ];

  useEffect(() => {
    setAvailableSpots(nairobiParkingSpots);
    calculateTotalCost();
  }, [duration]);

  const calculateTotalCost = () => {
    if (selectedParkingSpot) {
      setTotalCost(selectedParkingSpot.rate * duration);
    } else {
      setTotalCost(60 * duration); // Default rate
    }
  };

  const handleParkingSpotSelect = (spot) => {
    setSelectedParkingSpot(spot);
    setParkingLocation(spot.name);
    setShowMap(false);
    calculateTotalCost();
  };

  const handleBookParking = () => {
    if (!selectedParkingSpot) {
      Alert.alert('Error', 'Please select a parking spot');
      return;
    }
    if (duration < 1) {
      Alert.alert('Error', 'Please select a valid duration');
      return;
    }
    setShowPaymentModal(true);
  };

  const processPayment = async () => {
    if (!paymentMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      
      // Generate booking confirmation
      const bookingDetails = {
        id: Math.random().toString(36).substr(2, 9),
        spot: selectedParkingSpot.name,
        location: selectedParkingSpot.address,
        duration: duration,
        totalCost: totalCost,
        date: selectedDate.toLocaleDateString(),
        time: selectedDate.toLocaleTimeString(),
        paymentMethod: paymentMethod,
      };

      Alert.alert(
        'Booking Confirmed!',
        `Your parking has been booked successfully!\n\n` +
        `Booking ID: ${bookingDetails.id}\n` +
        `Location: ${bookingDetails.spot}\n` +
        `Duration: ${duration} hour(s)\n` +
        `Total: Ksh ${totalCost}\n` +
        `Payment: ${paymentMethod}\n\n` +
        `You will receive an SMS confirmation shortly.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setSelectedParkingSpot(null);
              setParkingLocation('');
              setDuration(1);
              setPaymentMethod('');
              setPhoneNumber('');
            },
          },
        ]
      );
    }, 3000);
  };

  const renderParkingSpot = (spot) => (
    <TouchableOpacity
      key={spot.id}
      style={[
        styles.parkingSpotCard,
        selectedParkingSpot?.id === spot.id && styles.selectedSpot,
      ]}
      onPress={() => handleParkingSpotSelect(spot)}
    >
      <View style={styles.spotHeader}>
        <Text style={styles.spotName}>{spot.name}</Text>
        <View style={styles.availabilityBadge}>
          <Text style={styles.availabilityText}>
            {spot.availableSpots} spots left
          </Text>
        </View>
      </View>
      <Text style={styles.spotAddress}>{spot.address}</Text>
      <View style={styles.spotFooter}>
        <Text style={styles.spotRate}>Ksh {spot.rate}/hour</Text>
        <Text style={styles.spotCapacity}>Capacity: {spot.capacity}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚗 Book Parking</Text>
        <Text style={styles.subtitle}>Find and reserve parking spots in our cities. </Text>
            
        <Text style={styles.subtitle2}>Okoa time na doo!</Text>
      </View>

      <View style={styles.formContainer}>
        {/* City Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select City</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCity}
              onValueChange={(itemValue) => setSelectedCity(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Nairobi" value="Nairobi" />
              <Picker.Item label="Mombasa" value="Mombasa" />
              <Picker.Item label="Machakos" value="Machakos" />
              <Picker.Item label="Nakuru" value="Nakuru" />
              <Picker.Item label="Kisumu" value="Kisumu" />  
            </Picker>
          </View>
        </View>

        {/* Parking Location Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Parking Location</Text>
          <TouchableOpacity
            style={styles.locationSelector}
            onPress={() => setShowMap(true)}
          >
            <Text style={parkingLocation ? styles.locationText : styles.placeholderText}>
              {parkingLocation || 'Select parking location from map'}
            </Text>
            <Text style={styles.mapIcon}>🗺️</Text>
          </TouchableOpacity>
        </View>

        {/* Date and Time Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date & Time</Text>
          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {selectedDate.toLocaleString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="datetime"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setSelectedDate(date);
              }}
            />
          )}
        </View>

        {/* Duration Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duration (Hours)</Text>
          <View style={styles.durationContainer}>
            <TouchableOpacity
              style={styles.durationButton}
              onPress={() => setDuration(Math.max(1, duration - 1))}
            >
              <Text style={styles.durationButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.durationText}>{duration} hour(s)</Text>
            <TouchableOpacity
              style={styles.durationButton}
              onPress={() => setDuration(duration + 1)}
            >
              <Text style={styles.durationButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Available Parking Spots */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Available Parking Spots</Text>
          {availableSpots.map(renderParkingSpot)}
        </View>

        {/* Cost Summary */}
        <View style={styles.costSummary}>
          <Text style={styles.costLabel}>Total Cost:</Text>
          <Text style={styles.costAmount}>Ksh {totalCost}</Text>
        </View>

        {/* Book Button */}
        <TouchableOpacity
          style={[
            styles.bookButton,
            (!selectedParkingSpot || isProcessing) && styles.disabledButton,
          ]}
          onPress={handleBookParking}
          disabled={!selectedParkingSpot || isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.bookButtonText}>
              Book Parking - Ksh {totalCost}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Map Modal */}
      <Modal
        visible={showMap}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.mapContainer}>
          <View style={styles.mapHeader}>
            <Text style={styles.mapTitle}>Select Parking Location</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowMap(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -1.2921,
              longitude: 36.8219,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {availableSpots.map((spot) => (
              <Marker
                key={spot.id}
                coordinate={spot.coordinates}
                title={spot.name}
                description={spot.address}
                onPress={() => handleParkingSpotSelect(spot)}
              />
            ))}
          </MapView>
          
          <View style={styles.mapSpotsList}>
            <ScrollView>
              {availableSpots.map(renderParkingSpot)}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Payment Modal */}
      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Complete Payment</Text>
            
            <View style={styles.paymentSummary}>
              <Text style={styles.summaryText}>
                {selectedParkingSpot?.name}
              </Text>
              <Text style={styles.summaryText}>
                {duration} hour(s) × Ksh {selectedParkingSpot?.rate}
              </Text>
              <Text style={styles.totalText}>Total: Ksh {totalCost}</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Payment Method</Text>
              <View style={styles.paymentMethods}>
                <TouchableOpacity
                  style={[
                    styles.paymentMethod,
                    paymentMethod === 'mpesa' && styles.selectedPayment,
                  ]}
                  onPress={() => setPaymentMethod('mpesa')}
                >
                  <Text style={styles.paymentText}>M-Pesa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.paymentMethod,
                    paymentMethod === 'airtel' && styles.selectedPayment,
                  ]}
                  onPress={() => setPaymentMethod('airtel')}
                >
                  <Text style={styles.paymentText}>Airtel Money</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="e.g., 07XX XXX XXX"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowPaymentModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  (!paymentMethod || !phoneNumber) && styles.disabledButton,
                ]}
                onPress={processPayment}
                disabled={!paymentMethod || !phoneNumber || isProcessing}
              >
                {isProcessing ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.confirmButtonText}>
                    Pay Ksh {totalCost}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    fontStyle: 'italic',
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
  },
  locationSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
  },
  locationText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  placeholderText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  mapIcon: {
    fontSize: 20,
  },
  dateSelector: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
  },
  dateText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  durationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  durationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  parkingSpotCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  selectedSpot: {
    borderColor: '#3498db',
    backgroundColor: '#e3f2fd',
  },
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  spotName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  availabilityBadge: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  spotAddress: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  spotFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spotRate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  spotCapacity: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  costSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  costLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  costAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  bookButton: {
    backgroundColor: '#2ecc71',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Map Styles
  mapContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3498db',
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
  },
  mapSpotsList: {
    flex: 1,
    padding: 10,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  paymentSummary: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginTop: 5,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentMethod: {
    flex: 1,
    padding: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedPayment: {
    borderColor: '#3498db',
    backgroundColor: '#e3f2fd',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderWidth: 2,
    borderColor: '#e74c3c',
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  disabledConfirmButton: {
    backgroundColor: '#bdc3c7',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookParkingScreen;

