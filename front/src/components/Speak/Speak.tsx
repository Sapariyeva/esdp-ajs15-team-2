import { ChangeEvent, useState } from 'react';


const TextToSpeech = () => {
    const [text, setText] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleSpeak = () => {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);

        // const voices = window.speechSynthesis.getVoices();
        // speech.voice = voices[3];
        // window.speechSynthesis.speak(speech);
    };

    return (
        <div className='speak'>
            <input
                type="text"
                value={text}
                onChange={handleChange}
                placeholder="Write text to speak"
            />
            <button onClick={handleSpeak}>🗣️</button>
        </div>
    );
};

export default TextToSpeech;
