import { useEffect, useState } from "react";

export function useBuzzer() {
    const [sound, setSound] = useState(null);

    useEffect(() => {
        const buzzer = new Audio();
        buzzer.src = "resources/buzzer_sound.wav";

        setSound(buzzer);
    }, []);

    const playBuzzer = () => {
        sound.play();
    };
    return playBuzzer;
}
