import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function SecondExperimentScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Second Experiment</Text>
      <Link href="/experiments" style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Experiments</Text>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
