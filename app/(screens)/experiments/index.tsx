import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ExperimentsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EXPERIMENTS</Text>
      </View>
      
      <View style={styles.tilesContainer}>
        {/* This tile now redirects to the breadboard UI */}
        <Link
          href={{
            pathname: "./experiments/semiconductor-characteristics",
          }} 
          style={styles.tile}
        >
          <Text style={styles.tileText}>Characteristics of Semiconductors</Text>
        </Link>
        
        <Link
          href={{
            pathname: "./experiments/second-experiment",
          }}
          style={styles.tile}
        >
          <Text style={styles.tileText}>Second Experiment</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 2,
  },
  tilesContainer: {
    marginTop: 30,
    gap: 20,
  },
  tile: {
    backgroundColor: '#f8d7da',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  tileText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
