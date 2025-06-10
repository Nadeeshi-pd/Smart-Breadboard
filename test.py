import serial
import time

arduino = serial.Serial('COM4', 115200, timeout=1)
time.sleep(2)  # Allow Arduino initialization

# Send command
arduino.write(b'1')  # Turn LED on

# Read data
while True:
    try:
        data = arduino.readline().decode('utf-8').strip()
        if data:
            print(f"Received: {data}")
    except KeyboardInterrupt:
        print("Stopping...")
        break

arduino.close()
