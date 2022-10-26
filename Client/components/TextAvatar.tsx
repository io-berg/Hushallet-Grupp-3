import { Text } from "react-native";

interface Props {
  icon: string;
  style?: object;
}

const TextAvatar = ({ icon, style }: Props) => {
  return <Text style={style}>{icon}</Text>;
};

export default TextAvatar;
