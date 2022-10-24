import { Text } from "react-native";
import { textToEmoji } from "../utils/avatar";

interface Props {
  icon: string;
  style?: object;
}

const TextAvatar = ({ icon, style }: Props) => {
  return <Text style={style}>{textToEmoji(icon)}</Text>;
};

export default TextAvatar;
