export const loadProgress = $state({ value: 0 });

let interval: ReturnType<typeof setInterval>;

export function startLoading() {
    loadProgress.value = 10;
    clearInterval(interval);
    interval = setInterval(() => {
        if (loadProgress.value < 90) {
            const inc = (100 - loadProgress.value) * 0.1;
            loadProgress.value += inc;
        }
    }, 400);
}

export function stopLoading() {
    clearInterval(interval);
    loadProgress.value = 100;
    setTimeout(() => { loadProgress.value = 0; }, 400);
}