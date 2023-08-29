import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity
} from 'react-native'
import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'
import Header from './src/components/Header'
import Timer from './src/components/Timer'

const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2']

export default function App() {
  const [isWorking, setIsWorking] = useState(true)
  const [time, setTime] = useState(25 * 60)
  const [currentTime, setCurrentTime] = useState('POMODORO' | 'SHORT' | 'BREAK')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    if (time === 0) {
      setIsActive(false)
      setIsWorking((prev) => !prev)
      setTime(isWorking ? 300 : 1500)
      playSound()
    }
    return () => clearInterval(interval)
  }, [isActive, time])

  const handleStartStop = () => {
    playSound()
    setIsActive(!isActive)
  }
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/countdown-3-96619.mp3')
    )
    await sound.playAsync()
  }
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' && 30,
          paddingHorizontal: 15
        }}>
        <Text style={styles.mainText}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity
          onPress={handleStartStop}
          style={styles.button}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isActive ? 'STOP' : 'START'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainText: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15
  }
})
