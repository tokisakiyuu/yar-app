import clsx from 'clsx'
import { useState } from 'react'
import { Pressable, SectionList, Text, View } from 'react-native'

export default function Page() {
  return (
    <SectionList
      sections={DATA}
      renderItem={({ item }) => <TranscationItem data={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <GroupHeader title={title} amount={-999} />
      )}
      ListFooterComponent={<NoMoreRecords />}
    />
  )
}

const GroupHeader = ({ title, amount }: { title: string; amount: number }) => {
  return (
    <View className="px-2 pt-3 pb-2 text-sm bg-white flex-row justify-between">
      <Text className="text-gray-400">{title}</Text>
      <Text className="text-gray-400">{amount}</Text>
    </View>
  )
}

const TranscationItem = ({ data }: { data: any }) => {
  const [isPress, setPress] = useState(false)
  const { remark, kind, amount } = data

  return (
    <Pressable
      onPressIn={() => setPress(true)}
      onPressOut={() => setPress(false)}
    >
      <View
        className={clsx(
          'px-2 py-3 bg-white border-solid border-gray-50 border-b-[1px]',
          {
            'bg-gray-100': isPress,
          },
        )}
      >
        <View className="flex-row items-center">
          <TranscationTag title={kind} />
          <Text className="text-lg ml-2">{remark}</Text>
          <Text className="text-lg ml-auto">{amount}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const TranscationTag = ({ title }: { title: string }) => {
  return (
    <View className="bg-blue-700 rounded justify-center px-[4px] h-[20px]">
      <Text className="text-white leading-[12px] text-[12px]">{title}</Text>
    </View>
  )
}

const NoMoreRecords = () => {
  return (
    <View className="py-8 items-center">
      <Text className="text-gray-300">No more records</Text>
    </View>
  )
}

const DATA = Array(5)
  .fill(0)
  .map((_, gi) => ({
    title: '2024年08月26日 周一',
    data: Array(5).fill({
      kind: '餐饮',
      remark: '吃吃吃',
      amount: -34.9,
      date: new Date(),
    }),
  }))
