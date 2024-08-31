import 'expo-dev-client'
import { Stack } from 'expo-router/stack'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{
          title: 'Takedown',
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}
