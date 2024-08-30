import { useIsCloudAvailable } from 'react-native-cloud-storage'

export default function useTheBook() {
  const available = useIsCloudAvailable()
  console.log('available', available)
}
