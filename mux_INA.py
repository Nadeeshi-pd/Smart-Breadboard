import serial
import time
import re
from datetime import datetime

class INA219Monitor:
    def __init__(self, port='COM4', baudrate=9600, timeout=2):
        self.port = port
        self.baudrate = baudrate
        self.timeout = timeout
        self.arduino = None
        self.data_log = []
        
    def connect(self):
        """Connect to Arduino"""
        try:
            self.arduino = serial.Serial(self.port, self.baudrate, timeout=self.timeout)
            print(f"Connected to Arduino on {self.port} at {self.baudrate} baud")
            time.sleep(3)  # Wait for Arduino initialization
            return True
        except serial.SerialException as e:
            print(f"Error connecting to Arduino: {e}")
            return False
    
    def disconnect(self):
        """Disconnect from Arduino"""
        if self.arduino and self.arduino.is_open:
            self.arduino.close()
            print("Serial connection closed")
    
    def parse_line_data(self, line):
        """Parse Arduino output line to extract channel, voltage, and current"""
        # Pattern: "Line 0: 12.34 V | 456.7 mA"
        pattern = r"Line (\d+): ([\d.]+) V \| ([\d.]+) mA"
        match = re.match(pattern, line)
        
        if match:
            channel = int(match.group(1))
            voltage = float(match.group(2))
            current = float(match.group(3))
            return channel, voltage, current
        return None
    
    def display_readings(self, readings_set):
        """Display a complete set of readings"""
        print(f"\n{'='*50}")
        print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"{'='*50}")
        
        for channel, voltage, current in readings_set:
            power = voltage * current / 1000  # Power in watts
            print(f"Line {channel:2d}: {voltage:6.2f} V | {current:7.1f} mA | {power:6.3f} W")
        
        # Calculate totals
        total_current = sum(current for _, _, current in readings_set)
        avg_voltage = sum(voltage for _, voltage, _ in readings_set) / len(readings_set)
        total_power = sum(voltage * current / 1000 for _, voltage, current in readings_set)
        
        print(f"{'='*50}")
        print(f"Average Voltage: {avg_voltage:6.2f} V")
        print(f"Total Current:   {total_current:7.1f} mA")
        print(f"Total Power:     {total_power:6.3f} W")
        print(f"{'='*50}")
    
    def save_to_log(self, readings_set):
        """Save readings to log for later analysis"""
        timestamp = datetime.now().isoformat()
        log_entry = {
            'timestamp': timestamp,
            'readings': readings_set
        }
        self.data_log.append(log_entry)
    
    def export_to_csv(self, filename=None):
        """Export logged data to CSV file"""
        if not filename:
            filename = f"ina219_readings_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        
        try:
            with open(filename, 'w') as f:
                f.write("Timestamp,Channel,Voltage_V,Current_mA,Power_W\n")
                for entry in self.data_log:
                    timestamp = entry['timestamp']
                    for channel, voltage, current in entry['readings']:
                        power = voltage * current / 1000
                        f.write(f"{timestamp},{channel},{voltage:.2f},{current:.1f},{power:.3f}\n")
            print(f"Data exported to {filename}")
        except Exception as e:
            print(f"Error exporting data: {e}")
    
    def monitor_continuous(self, save_log=True, display_raw=False):
        """Monitor Arduino output continuously"""
        if not self.connect():
            return
        
        print("Monitoring Arduino INA219 Multiplexer...")
        print("Press Ctrl+C to stop")
        
        current_readings = []
        
        try:
            while True:
                try:
                    if self.arduino.in_waiting > 0:
                        line = self.arduino.readline().decode('utf-8').strip()
                        
                        if line:
                            if display_raw:
                                print(f"Raw: {line}")
                            
                            # Check for separator (end of reading cycle)
                            if "========================" in line:
                                if current_readings:
                                    # Sort readings by channel number
                                    current_readings.sort(key=lambda x: x[0])
                                    
                                    # Display the complete set
                                    self.display_readings(current_readings)
                                    
                                    # Save to log if requested
                                    if save_log:
                                        self.save_to_log(current_readings)
                                    
                                    current_readings = []
                            else:
                                # Try to parse line data
                                parsed = self.parse_line_data(line)
                                if parsed:
                                    current_readings.append(parsed)
                                elif "Ready" in line or "detected" in line:
                                    print(f"Arduino: {line}")
                    
                    time.sleep(0.1)  # Small delay to prevent excessive CPU usage
                    
                except KeyboardInterrupt:
                    print("\nStopping monitoring...")
                    break
                    
        except Exception as e:
            print(f"Error during monitoring: {e}")
        
        finally:
            self.disconnect()
            
            # Offer to export data
            if save_log and self.data_log:
                response = input(f"\nSave {len(self.data_log)} reading sets to CSV? (y/n): ")
                if response.lower() == 'y':
                    self.export_to_csv()

def find_arduino_port():
    """Find available serial ports (helpful for troubleshooting)"""
    import serial.tools.list_ports
    
    print("Available serial ports:")
    ports = serial.tools.list_ports.comports()
    for port in ports:
        print(f"  {port.device} - {port.description}")
    
    if not ports:
        print("  No serial ports found!")

# Main execution
if __name__ == "__main__":
    # Configuration
    ARDUINO_PORT = 'COM4'  # Change this to your Arduino port
    BAUD_RATE = 9600       # Must match Arduino baud rate
    
    print("Arduino INA219 Multiplexer Monitor")
    print("=" * 40)
    
    # Uncomment the next line if you need to find your Arduino port
    # find_arduino_port()
    
    # Create monitor instance
    monitor = INA219Monitor(port=ARDUINO_PORT, baudrate=BAUD_RATE)
    
    # Start monitoring
    try:
        monitor.monitor_continuous(save_log=True, display_raw=False)
    except Exception as e:
        print(f"Program error: {e}")
    
    print("Program ended.")