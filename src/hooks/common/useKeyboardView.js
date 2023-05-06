//@ts-check
import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

export default function useKeyboardVisible() {
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });

        const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        })

        return () => {
            keyboardDidHide.remove();
            keyboardDidShowListener.remove();
        }
    });

    return keyboardVisible;
}