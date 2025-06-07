import { StyleSheet, View } from 'react-native';

export default function CircuitIcon() {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <View style={styles.leftSection}>
          {[...Array(6)].map((_, rowIndex) => (
            <View key={rowIndex} style={styles.dotRow}>
              {[...Array(4)].map((_, dotIndex) => (
                <View key={dotIndex} style={styles.dot} />
              ))}
            </View>
          ))}
        </View>
        <View style={styles.rightSection}>
          <View style={styles.circuitPath}>
            <View style={styles.horizontalLine} />
            <View style={styles.junction} />
            <View style={styles.verticalLine} />
            <View style={styles.bottomJunction} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconBox: {
    width: 80,
    height: 80,
    borderWidth: 3,
    borderColor: '#333',
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  leftSection: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: '#333',
    borderRadius: 1.5,
  },
  rightSection: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circuitPath: {
    position: 'relative',
  },
  horizontalLine: {
    width: 20,
    height: 2,
    backgroundColor: '#333',
  },
  junction: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#333',
    backgroundColor: 'white',
    position: 'absolute',
    right: -3,
    top: -2,
  },
  verticalLine: {
    width: 2,
    height: 15,
    backgroundColor: '#333',
    position: 'absolute',
    right: -1,
    top: 4,
  },
  bottomJunction: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#333',
    backgroundColor: 'white',
    position: 'absolute',
    right: -3,
    top: 17,
  },
});
