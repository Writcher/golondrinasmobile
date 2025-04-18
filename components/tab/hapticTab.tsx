import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        props.onPressIn?.(ev);
      }}
      onPressOut={(ev) => {
        
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        props.onPressOut?.(ev);
      }}
    />
  );
}
