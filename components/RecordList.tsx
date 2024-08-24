import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const RecordList = () => {
  const insets = useSafeAreaInsets()

  return (
    <FlatList
      style={{
        ...styles.list,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      data={Array(10).fill(0)}
      renderItem={({ item }) => <RecordItem data={item} />}
    />
  )
}

const RecordItem = ({ data }: { data: any }) => {
  return (
    <Pressable>
      <View>
        <Text>Hello World {data}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
})

export default RecordList
