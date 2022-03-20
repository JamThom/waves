export const loadWave = (waveName: string) => localStorage.getItem(waveName)?.split(',').map((n: string) => parseFloat(n));

export const saveWave = (waveName: string) => (wave: number[]) => localStorage.setItem(waveName, wave.join(','));