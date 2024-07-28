import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { ChangeEvent, useState } from 'react';
import ExcelJS from 'exceljs';
import { Maybe } from '@/components/AdminComponents/Users/Maybe';

// npm install exceljs для установки библиотеки
// npm uninstall xlsx удалить уязвимую библиотеку
// Тестовый контейнер для конвертации Excel в JSON и выгрузки в Excel
// В дальнейшем контейнер возможно изменится

const array = [
    {
        name: 'Petya',
        age: 12,
        year: "12/07/95",
        id: 21312
    }
];

const Students = () => {

    const [excelData, setExcelData] = useState<string[][] | null>(null);
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => { // Обработчик выбора файла
        const file = Maybe
            .fromNullable(e.target.files)
            .map((files) => files[0])
            .getOrElse(null); // переменная file содержит информацию о выбранном файле

        if (!file) return;

        const reader = new FileReader(); // создается объект FileReader
        reader.onload = async (event) => {// Обработчик загрузки файла
            const buffer = Maybe
                .fromNullable(event.target?.result)
                .getOrElse(null) as ArrayBuffer;
            // Получение содержимого файла в виде ArrayBuffer
            //Когда файл загружается через браузер данные попадают в ArrayBuffer и FileReader может прочитать файл
            const workbook = new ExcelJS.Workbook(); // Создание экземпляра Workbook
            await workbook.xlsx.load(buffer); // Загрузка содержимого файла в экземпляр Workbook данными buffer

            const worksheet = Maybe
                .fromNullable(workbook.worksheets)
                .map((worksheets) => worksheets[0])
                .getOrElse(workbook.worksheets[0]);
            // Получение первого листа из Workbook 
            const data: string[][] = [];
            worksheet.eachRow((row) => {
                const rowData: string[] = [];
                row.eachCell((cell) => {// Перебор каждой ячейки (cell) в строке (row)
                    rowData.push(cell.value ? cell.value.toString() : '');
                });
                data.push(rowData);
            });
            setExcelData(data);
        };
        reader.readAsArrayBuffer(file);
    };

    const exportToExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1'); // Добавляет новый лист с названием 'Sheet1' в созданную книгу.
        // Добавление заголовков header - для названия столбца,key - значение
        // выполняет инициализацию структуры данных для листа Excel
        worksheet.columns = Object.keys(array[0]).map(key => ({ header: key, key }));

        array.forEach((item) => {  // Добавление данных
            worksheet.addRow(item);
        });

        workbook.xlsx.writeBuffer().then((buffer) => {//создает буфер с данными Excel
            //Blob: Бинарный объект большого размера, представляющий файл.
            //type: MIME-тип для файлов Excel. application/vnd.openxmlformats-officedocument.spreadsheetml.sheet указывает, 
            //что это файл Excel в формате OpenXML.
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');//создание ссылки для инициирования скачивания файла.
            link.href = URL.createObjectURL(blob);//Создает временный URL, ссылающийся на данные в blob
            link.download = 'exported_data.xlsx'; //указывает имя скачиваемого файла
            link.click();//запускает скачивание файла
        });
    }
    return (
        <>
            <p style={{ marginLeft: '10px' }}>У вас нет студентов. Добавьте нового студента</p>
            <div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px' }}>
                <button
                    style={{
                        width: '300px',
                        height: '50px',
                        marginBottom: '5px',
                        borderRadius: '10px',
                        backgroundColor: '#9069CD',
                        borderColor: '#9069CD',
                        color: 'white'
                    }}>Добавить нового студента</button>
                <input
                    type="file"
                    id="file-upload"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
                <label htmlFor="file-upload" style={{
                    display: 'inline-block',
                    width: '300px',
                    height: '50px',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    color: 'black',
                    textAlign: 'center',
                    lineHeight: '50px',
                    cursor: 'pointer',
                    border: '1px solid black'
                }}>
                    <DownloadOutlined style={{ marginRight: '8px' }} />
                    Импорт данных студента
                </label>
            </div>
            {excelData && (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginLeft: "10px",
                }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex' }}><p>Студент <span style={{ color: '#58A700' }}>"Имя ученика"</span></p>
                            <button onClick={exportToExcel} style={{ marginLeft: '50px', borderRadius: '5px' }}><UploadOutlined /> Экспорт данных студента</button></div>
                        <div> <button style=
                            {{
                                border: 'none',
                                backgroundColor: 'white',
                                color: "#9069CD",
                                textDecoration: 'underline',
                                textUnderlineOffset: '5px'
                            }}>Удалить студента
                        </button>
                        </div>
                    </div>
                    {excelData.slice(1).map((row, rowIndex) => (
                        <div key={rowIndex} style={{ marginBottom: '10px' }}>
                            {row.map((cell, cellIndex) => (
                                <div style={{
                                    border: '1px solid #c9c9c9',
                                    borderRadius: '10px',
                                    marginBottom: '5px',
                                    textAlign: "center",
                                    width: '300px',
                                    height: '50px'
                                }}>
                                    <p style={{ paddingTop: '10px' }} key={cellIndex}>{cell}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Students;