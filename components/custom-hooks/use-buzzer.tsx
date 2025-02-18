import {useEffect, useState} from "react";

export function useBuzzer(): () => void {
    const [sound, setSound] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        const buzzer = new Audio();
        buzzer.src = "resources/buzzer_sound.wav";

        setSound(buzzer);
    }, []);

    return () => {
        if (sound) {
            sound.play();
        }
    };
}
