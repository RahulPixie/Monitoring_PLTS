// Array untuk menyimpan data voltage, ampere, dan daya (watt)
const voltageData = [];
const ampereData = [];
const dayaData = [];

// Inisialisasi chart untuk Voltage, Ampere, dan Watt
const voltageChartCtx = document.getElementById('voltageChart').getContext('2d');
const ampereChartCtx = document.getElementById('ampereChart').getContext('2d');
const dayaChartCtx = document.getElementById('dayaChart').getContext('2d');

const voltageChart = new Chart(voltageChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Voltage (V)',
            data: voltageData,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ampereChart = new Chart(ampereChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Ampere (A)',
            data: ampereData,
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const dayaChart = new Chart(dayaChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Watt (W)',
            data: dayaData,
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Inisialisasi gauge untuk Voltage, Ampere, dan Watt
const voltageGauge = new JustGage({
    id: "voltageGauge",
    value: 0,
    min: 0,
    max: 500, // Sesuaikan dengan rentang yang diinginkan
    title: "Voltage (V)",
    label: "V",
    relativeGaugeSize: true // Membuat gauge mengikuti ukuran container
});

const ampereGauge = new JustGage({
    id: "ampereGauge",
    value: 0,
    min: 0,
    max: 100, // Sesuaikan dengan rentang yang diinginkan
    title: "Ampere (A)",
    label: "A",
    relativeGaugeSize: true // Membuat gauge mengikuti ukuran container
});

const wattGauge = new JustGage({
    id: "wattGauge",
    value: 0,
    min: 0,
    max: 2000, // Sesuaikan dengan rentang yang diinginkan
    title: "Watt (W)",
    label: "W",
    relativeGaugeSize: true // Membuat gauge mengikuti ukuran container
});

// Event listener untuk menghitung dan memperbarui data dari input manual
document.getElementById('submit').addEventListener('click', () => {
    const voltage = parseFloat(document.getElementById('voltage').value);
    const ampere = parseFloat(document.getElementById('ampere').value);

    // Pastikan nilai input adalah angka yang valid
    if (!isNaN(voltage) && !isNaN(ampere)) {
        const watt = voltage * ampere; // Menghitung daya (Watt)

        // Menyimpan data ke dalam array
        voltageData.push(voltage);
        ampereData.push(ampere);
        dayaData.push(watt);

        // Menyimpan waktu sekarang untuk label di grafik
        const currentTime = new Date().toLocaleTimeString();
        voltageChart.data.labels.push(currentTime);
        ampereChart.data.labels.push(currentTime);
        dayaChart.data.labels.push(currentTime);

        // Update gauge untuk voltage, ampere, dan watt
        voltageGauge.refresh(voltage);
        ampereGauge.refresh(ampere);
        wattGauge.refresh(watt);

        // Update chart
        voltageChart.update();
        ampereChart.update();
        dayaChart.update();

        // Kosongkan input
        document.getElementById('voltage').value = '';
        document.getElementById('ampere').value = '';
    }
});

// Fungsi untuk mengacak angka dalam rentang tertentu
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Simulasi setiap 5 detik untuk voltage dan ampere acak
setInterval(() => {
    const randomVoltage = parseFloat(getRandomNumber(200, 230).toFixed(2)); // Voltage random antara 200-230
    const randomAmpere = parseFloat(getRandomNumber(1, 10).toFixed(2));    // Ampere random antara 1-10
    const randomWatt = randomVoltage * randomAmpere;                        // Menghitung daya

    // Menyimpan data ke dalam array
    voltageData.push(randomVoltage);
    ampereData.push(randomAmpere);
    dayaData.push(randomWatt);

    // Menyimpan waktu sekarang untuk label di grafik
    const currentTime = new Date().toLocaleTimeString();
    voltageChart.data.labels.push(currentTime);
    ampereChart.data.labels.push(currentTime);
    dayaChart.data.labels.push(currentTime);

    // Update gauge untuk voltage, ampere, dan watt
    voltageGauge.refresh(randomVoltage);
    ampereGauge.refresh(randomAmpere);
    wattGauge.refresh(randomWatt);

    // Update chart
    voltageChart.update();
    ampereChart.update();
    dayaChart.update();

}, 3000); // Setiap 3000ms atau 3 detik
