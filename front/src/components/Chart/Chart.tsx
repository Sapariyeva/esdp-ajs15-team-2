import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales } from 'chart.js';

ChartJS.register(   /* регистрация компонентов которые используются в графике */
    CategoryScale,  /* шкала отображения на оси X >*/
    LinearScale,    /* шкала отображения на оси Y ^ */
    PointElement,   /* Точка на графике */
    LineElement,    /* Линия на графике */
    Title,          /* Отображение заголовка на графике */
    Tooltip,        /* всплывающие подсказки к графику*/
    Legend,         /* представляют различные цвета на графике*/
    scales          /* модуль, который содержит различные типы шкал */
);

// Компонент для отрисовки графика
const LineChart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],/* Массив строк,которые обозначают метки на оси X графика.*/
        datasets: [/*Массив объектов, каждый из которых представляет один набор данных, отображаемый на графике.Може быть несколько объектов*/
            {
                label: 'Всплывашка',/*Название,которое будет отображаться в легенде графика*/
                data: [90, 100, 20, 81, 56, 55, 100],/*Массив чисел, представляющих значения данных, соответствующие меткам на оси X.*/
                fill: false,/*нужно ли заполнять область под линией*/
                borderColor: '#9069CD',/*цвет линии*/
                tension: 0.1/*степень кривизны линии от 0 до 1*/
            }
        ]
    };

    const options = {
        responsive: true, // указывает, должен ли график автоматически подстраиваться под размер контейнера
        plugins: { // настройки для различных подключаемых модулей
            legend: { // Настройки для отображения легенды на графике.
                display: false,
            },
            title: { // Настройки для отображения заголовка графика.
                display: false
            },
            tooltip: { // Настройки для всплывающих подсказок
                displayColors: false, // Отключает индикаторы цветов
                callbacks: {
                    label: function (context: any) { // Функция для форматирования содержимого подсказки
                        return [
                            `${context.dataset.label}`,
                            `КУ: ${context.parsed.y}%`,
                            'Глаголы:'
                        ];
                    }
                }
            }
        },
        scales: {
            y: {
                min: 0,
                suggestedMax: 100,
                ticks: {/*используется для управления отображением меток на шкалах графика*/
                    callback: function (value: unknown) {
                        return value + '%'; // Добавляет знак % к меткам оси Y
                    },
                    stepSize: 10 // Шаг между метками на оси Y
                }
            },
        }
    };

    return (
        <div style={{ width: '800px', height: '600px' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
