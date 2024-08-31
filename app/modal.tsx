import clsx from 'clsx'
import { useRef, useState } from 'react'
import {
  Button,
  InputAccessoryView,
  Keyboard,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TextInputTextInputEventData,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native'

export default function Page() {
  const inputRef = useRef<TextInput>(null)
  const [kind, setKind] = useState<string>(KINDS.at(0) as string)
  const [remark, setRemark] = useState('')
  const [prefix, setPrefix] = useState('-')
  const [amountText, setAmountText] = useState('')
  const [caretPos, setCaretPos] = useState(0)
  const { width } = useWindowDimensions()

  const popChar = () => {
    if (!amountText) return
    const offset = amountText.length - 1
    setAmountText(amountText.substring(0, offset))
    setCaretPos(offset)
  }

  const pushNumber = (numChar: string) => {
    const num = Number(numChar)
    if (!isNumberChar(numChar) || num > 9) return
    setAmountText(amountText + num)
    setCaretPos(caretPos + 1)
  }

  const pushChar = (char: string) => {
    if (!char) return
    setAmountText(amountText + char)
    setCaretPos(caretPos + 1)
  }

  const handleTextInput = (
    e: NativeSyntheticEvent<TextInputTextInputEventData>,
  ) => {
    const char = e.nativeEvent.text
    if (!char) return popChar()
    const prevInputChar = amountText.at(amountText.length - 1) ?? ''
    if (
      char === '.' &&
      prevInputChar &&
      isNumberChar(prevInputChar) &&
      !amountText.includes('.')
    )
      return pushChar('.')
    return pushNumber(char)
  }

  const handleSubmit = () => {
    console.log('amount:', Number(`${prefix}${amountText}`))
    console.log('kind', kind)
    console.log('remark', remark)
  }

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
                selection={{ start: caretPos, end: caretPos }}
                value={amountText}
                onTextInput={handleTextInput}
              />
            </View>
          </Pressable>
        </View>

        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="w-3" />
            <View className="flex-row gap-x-4">
              {KINDS.map(k => (
                <View
                  key={k}
                  className={clsx(
                    'rounded-md  p-3',
                    k === kind ? 'bg-gray-800' : 'bg-gray-200',
                  )}
                  onTouchStart={() => setKind(k)}
                >
                  <Text
                    className={clsx(
                      'text-[20px] leading-none m-auto',
                      k === kind && 'text-white',
                    )}
                  >
                    {k}
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
              value={remark}
              onChangeText={setRemark}
            />
          </View>
        </View>

        <View className="mt-5 px-3">
          <View className="bg-blue-500 rounded-md">
            <Button title="Create" color="white" onPress={handleSubmit} />
          </View>
        </View>

        <InputAccessoryView nativeID="how_much_input">
          <View
            className="bg-gray-300 text-xl p-2 flex-row justify-center"
            style={{ width }}
          >
            <Pressable onPress={() => setPrefix(prefix === '-' ? '+' : '-')}>
              <Text className="text-xl font-bold tracking-[8px]">+/-</Text>
            </Pressable>
          </View>
        </InputAccessoryView>
      </View>
    </TouchableWithoutFeedback>
  )
}

function isNumberChar(numChar: string) {
  return !Number.isNaN(Number(numChar))
}

const KINDS = '餐饮/日用/交通/购物/娱乐/通信/理财/社交/医疗'.split('/')
