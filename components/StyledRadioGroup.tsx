import { TouchableOpacity } from "react-native";
import { Box } from "./Box";
import { StyledText } from "./StyledText";

type ItemType = { name: string; value: string; id: string }

interface RadioItemProps {
    item: ItemType;
    onSelect: (id: string) => void
}
interface RadioGroupProps {
    radioItems: Array<ItemType>;
    onItemSelected: (id: string) => void;
}

const RadioItem: React.FC<RadioItemProps> = ({ item, onSelect }) => {
    return (
        <TouchableOpacity
            onPress={() => onSelect(item.id)} activeOpacity={0.8} style={{ flex: 1 }}>
            <Box flexDirection="row"
                alignItems='center'
                justifyContent="space-between"
                borderRadius="s"
                padding="xs"
                marginVertical="s"
                flex={1}>
                <StyledText>{item.name}</StyledText>
            </Box>
        </TouchableOpacity>
    )
}

const StyledRadioGroup: React.FC<RadioGroupProps> = ({ radioItems, onItemSelected }) => {
    return (
        <Box width="100%" gap="s">
            {radioItems.map(item => (
                <RadioItem key={item.id} item={item} onSelect={onItemSelected} />
            ))}
        </Box>
    )
}


export default StyledRadioGroup;