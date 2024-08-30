import clsx from 'clsx'
import { useRef, useState } from 'react'
import {
  Button,
  InputAccessoryView,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

export default function Page() {
  const inputRef = useRef<TextInput>(null)
  const [selectedKind, setSelectedKind] = useState<string>(
    KINDS.at(0) as string,
  )
  const [prefix, setPrefix] = useState('-')
  const [amountText, setAmountText] = useState('')
  const [selection, setSelection] = useState({ start: 0, end: 0 })

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <View className="p-3">
          <Pressable onPress={() => inputRef.current?.focus()}>
            <View className="bg-white rounded-md p-2 flex-row items-center justify-end">
              <Text className="leading-none text-[40px]">{prefix}</Text>
              <TextInput
                ref={inputRef}
                keyboardType="decimal-pad"
                inputAccessoryViewID="how_much_input"
                autoFocus
                contextMenuHidden
                textContentType="none"
                autoComplete="off"
                className="leading-none text-[46px] text-right"
                selection={selection}
                value={amountText}
                onChangeText={text => {
                  setAmountText(text)
                  setSelection({ start: text.length, end: text.length })
                }}
              />
            </View>
          </Pressable>
        </View>

        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="w-3" />
            <View className="flex-row gap-x-4">
              {KINDS.map(kind => (
                <View
                  key={kind}
                  className={clsx(
                    'rounded-md  p-3',
                    selectedKind === kind ? 'bg-gray-800' : 'bg-gray-200',
                  )}
                  onTouchStart={() => setSelectedKind(kind)}
                >
                  <Text
                    className={clsx(
                      'text-[20px] leading-none m-auto',
                      selectedKind === kind && 'text-white',
                    )}
                  >
                    {kind}
                  </Text>
                </View>
              ))}
            </View>
            <View className="w-3" />
          </ScrollView>
        </View>

        <View className="p-2">
          <View className="bg-white rounded-md p-2">
            <TextInput
              multiline
              placeholder="Remark"
              className="leading-[30px] min-h-[120px] text-[26px]"
            />
          </View>
        </View>

        <View className="mt-5 px-3">
          <View className="bg-blue-500 rounded-md">
            <Button title="Create" color="white" />
          </View>
        </View>

        <InputAccessoryView nativeID="how_much_input">
          <View className="bg-gray-300 text-xl p-2 w-[100vw]">
            <Pressable
              className="mx-auto"
              onPress={() => setPrefix(prefix === '-' ? '+' : '-')}
            >
              <Text className="text-xl font-bold tracking-[8px]">+/-</Text>
            </Pressable>
          </View>
        </InputAccessoryView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const KINDS = '餐饮/日用/交通/购物/娱乐/通信/理财/社交/医疗'.split('/')
