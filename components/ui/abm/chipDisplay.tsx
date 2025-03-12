import { View, Text } from "react-native";
import { ActivityIndicator, Chip } from "react-native-paper";

type Cabin = {
    id: number,
    name: string,
    capacity: number
}

type ChipDisplayProps = {
    alreadySearched: boolean,
    fetchingCabins: boolean,
    fetchedCabins: Cabin[],
    selectedCabins: number[],
    onChipSelection: (id:number) => void
}

export default function ChipDisplay({ alreadySearched, fetchingCabins, fetchedCabins, selectedCabins, onChipSelection }: ChipDisplayProps) {
    return (
        <View className="w-full h-[87px] border border-black rounded items-center justify-center">
        {!alreadySearched ? (
          <Text className="text-lg text-gray-900 font-semibold">Ingrese Fechas y Cantidad de Visitantes</Text>
        ) : fetchingCabins ? (
          <ActivityIndicator animating={true} />
        ) : fetchedCabins && Array.isArray(fetchedCabins) && fetchedCabins.length > 0 ? (
          <View className="flex flex-row flex-wrap gap-2 h-full w-full p-2 justify-center">
            {fetchedCabins.map((cabin, index) => (
              <Chip
                key={index}
                className={selectedCabins.includes(cabin.id) ? `!bg-lime-400` : `!bg-yellow-400`}
                selected={selectedCabins.includes(cabin.id)}
                onPress={() => onChipSelection(cabin.id)}
              >
                {cabin.name}
              </Chip>
            ))}
          </View>
        ) : (
          <Text className="text-lg text-gray-900 font-semibold">No hay Disponibilidad</Text>
        )}
      </View>
    )
}