import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SemiconductorCharacteristicsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with Icons */}
        <View style={styles.header}>
          <View style={styles.breadboardIcon}>
            <View style={styles.iconGrid}>
              {[...Array(12)].map((_, i) => (
                <View key={i} style={styles.iconDot} />
              ))}
            </View>
          </View>
          <View style={styles.userIcon}>
            <View style={styles.userAvatar} />
          </View>
        </View>

        {/* Bluetooth Connection Status */}
        <View style={styles.connectionSection}>
          <View style={styles.bluetoothIcon}>
            <Text style={styles.bluetoothSymbol}>🔵</Text>
          </View>
          <Text style={styles.connectedText}>CONNECTED</Text>
          <View style={styles.statusDot} />
        </View>

        {/* Breadboard Visualization */}
        <View style={styles.breadboardContainer}>
          <View style={styles.breadboard}>
            {/* Top section */}
            <View style={styles.breadboardSection}>
              {[...Array(30)].map((_, rowIndex) => (
                <View key={`top-${rowIndex}`} style={styles.breadboardRow}>
                  {[...Array(60)].map((_, colIndex) => (
                    <View key={`top-${rowIndex}-${colIndex}`} style={styles.breadboardHole} />
                  ))}
                </View>
              ))}
            </View>
            
            {/* Middle gap */}
            <View style={styles.breadboardGap} />
            
            {/* Bottom section */}
            <View style={styles.breadboardSection}>
              {[...Array(30)].map((_, rowIndex) => (
                <View key={`bottom-${rowIndex}`} style={styles.breadboardRow}>
                  {[...Array(60)].map((_, colIndex) => (
                    <View key={`bottom-${rowIndex}-${colIndex}`} style={styles.breadboardHole} />
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Instructions Section */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>INSTRUCTIONS</Text>
          <Text style={styles.instructionText}>
            Connect your components in coloured area
          </Text>
          <Text style={styles.instructionText}>
            Reassure component connectivity before conducting the experiment from.
          </Text>
        </View>

        {/* Check Connectivity Button */}
        <TouchableOpacity style={styles.connectivityButton}>
          <Text style={styles.buttonText}>Check Connectivity</Text>
        </TouchableOpacity>

        {/* Back Button */}
        <Link href="/experiments" style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back to Experiments</Text>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  breadboardIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGrid: {
    width: 24,
    height: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconDot: {
    width: 3,
    height: 3,
    backgroundColor: 'white',
    margin: 1,
    borderRadius: 1.5,
  },
  userIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#f8d7da',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    width: 24,
    height: 24,
    backgroundColor: '#333',
    borderRadius: 12,
  },
  connectionSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  bluetoothIcon: {
    marginRight: 10,
  },
  bluetoothSymbol: {
    fontSize: 24,
    color: '#4c6ef5',
  },
  connectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  statusDot: {
    width: 12,
    height: 12,
    backgroundColor: '#51cf66',
    borderRadius: 6,
  },
  breadboardContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  breadboard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  breadboardSection: {
    width: 300,
    height: 120,
  },
  breadboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  breadboardHole: {
    width: 2,
    height: 2,
    backgroundColor: '#333',
    borderRadius: 1,
  },
  breadboardGap: {
    height: 20,
    backgroundColor: 'transparent',
  },
  instructionsContainer: {
    marginBottom: 30,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 5,
  },
  connectivityButton: {
    backgroundColor: '#f8d7da',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
