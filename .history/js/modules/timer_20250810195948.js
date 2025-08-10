function timer() {
    const endData = new Date('2025-07-29'),
        hours = document.querySelector('#hours'),
        days = document.querySelector('#days'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds');

    function updateData() {
        const startData = new Date();
        let diffData = endData - startData;
        if (diffData <= 0) {
            days.textContent = '0';
            hours.textContent = '0';
            minutes.textContent = '0';
            seconds.textContent = '0';
            clearInterval(timerId);
            return;
        }
        const totalSeconds = Math.floor(diffData / 1000);
        days.textContent = Math.floor(totalSeconds / (3600 * 24));
        hours.textContent = Math.floor(totalSeconds / (3600) % 24) - 3;
        minutes.textContent = Math.floor(totalSeconds / 60) % 60;
        seconds.textContent = totalSeconds % 60;
    }
    const timerId = setInterval(updateData, 1000);
    updateData();
}

export default timer;