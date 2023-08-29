import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
const options = ['Pomodoro', 'Short Break', 'Long Break']
export default Header = ({ setTime, currentTime, setCurrentTime }) => {
  const handlePress = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15
    setCurrentTime(index)
    setTime(newTime * 60)
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      {options.map((item, i) => (
        <TouchableOpacity
          onPress={() => handlePress(i)}
          style={[
            styles.itemStyle,
            currentTime !== i && { borderColor: 'transparent' }
          ]}
          key={i}>
          <Text style={{ fontWeight: 'bold' }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    width: '33.33%',
    borderWidth: 3,
    alignItems: 'center',
    borderColor: 'white',
    borderRadius: 10,
    padding: 5,
    marginVertical: 30
  }
})
