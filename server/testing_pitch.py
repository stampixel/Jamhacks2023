import librosa
import numpy as np

def get_average_pitch(wav_file, start_time, end_time):
    # Load the audio file
    audio, sr = librosa.load(wav_file)
    
    # Calculate the start and end samples based on time
    start_sample = int(start_time * sr)
    end_sample = int(end_time * sr)
    
    # Extract the desired segment from the audio
    segment = audio[start_sample:end_sample]
    
    # Define the pitch search range
    fmin = 100 
    fmax = 2000 

    pitches = librosa.yin(segment, fmin=fmin, fmax=fmax, sr=sr)
    pitch_values = pitches[np.nonzero(pitches)]
    
    # Calculate the average pitch
    average_pitch = np.mean(pitch_values)
    
    return average_pitch

wav_file = 'server/MoneyTrees.wav'
start_time = 2.5 
end_time = 60 

average_pitch = get_average_pitch(wav_file, start_time, end_time)

# Print the result
print(f"Average pitch between {start_time} and {end_time} seconds: {average_pitch} Hz")
