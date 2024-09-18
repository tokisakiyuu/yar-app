import * as DocumentPicker from 'expo-document-picker'
import { Button, View } from 'react-native'

export default function Page() {
  const handleSelect = () => {
    DocumentPicker.getDocumentAsync()
  }

  return (
    <View>
      <View>
        <Button title="Select Folder" onPress={handleSelect} />
      </View>
    </View>
  )
}
