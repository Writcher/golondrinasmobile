import { useState, useEffect} from "react";
import { Snackbar } from "react-native-paper";

export default function FeedbackSnackBar({ isSuccess, message }:{
    isSuccess: string | null,
    message: string
}){

      const [visible, setVisible] = useState(false);
    
      useEffect(() => {
        if (isSuccess === "true") {
          setVisible(true);
          const timer = setTimeout(() => {
            setVisible(false);
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [isSuccess]);

    return (
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Ok',
          onPress: () => {
            setVisible(false)
          },
        }}
        className="!bg-white"
        elevation={0}
        >
        {message}
      </Snackbar>
    )
}