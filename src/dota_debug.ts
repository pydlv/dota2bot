let lastUpdate = RealTime();
const interval = 1;

export function debugTick() {
    const now = RealTime();

    if (lastUpdate + interval > now) {
        return;
    } else {
        lastUpdate = now;
    }

    
}
