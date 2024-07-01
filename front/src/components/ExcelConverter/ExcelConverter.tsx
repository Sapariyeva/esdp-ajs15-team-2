import { ChangeEvent, useState } from 'react';
import * as XLSX from 'xlsx';
import "./ExcelConverter.css"

const array = [
    {
        name: 'test',
        age: 12,
        content: 'test'
    }
]

// Тестовый компонент для конвертации Excel в JSON и выгрузки в Excel
// В дальнейшем перенести функционал, на страницу где выгружаются данные
const ExcelComponent = () => {

    const [excelData, setExcelData] = useState<string[][] | null>(null);

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryString = event.target?.result;
            const workbook = XLSX.read(binaryString, { type: 'binary' }); /* парсит эти данные  представленых в бинарном формате*/
            const sheetName = workbook.SheetNames[0]; /* извлекает название первого листа */
            const sheet = workbook.Sheets[sheetName]; /* объект который представляет лист */
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][]; /* преобразования содержимого листа в JSON,header: 1 содержит заголовки столбцов */
            setExcelData(data);
        };
        reader.readAsArrayBuffer(file);
    };
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(array); /* парсит массив в лист XLSX */
        const workbook = XLSX.utils.book_new(); /* создает файл excel */
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); /* записывает лист в файл с названием "Sheet1" */
        XLSX.writeFile(workbook, 'exported_data.xlsx'); /* сохраняет файл excel с названием "exported_data.xlsx" */
    };

    return (
        <div className="table-container">
            <input type="file" onChange={handleFileUpload} />
            <button onClick={exportToExcel}>Export to Excel</button>
            {excelData && (
                <table>
                    <tbody>
                        {excelData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        // <h2>Array Table</h2>
        // <table>
        //     <thead>
        //         <tr>
        //             {Object.keys(array[0]).map((key, index) => (
        //                 <th key={index}>{key}</th>
        //             ))}
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {array.map((item, rowIndex) => (
        //             <tr key={rowIndex}>
        //                 {Object.values(item).map((value, cellIndex) => (
        //                     <td key={cellIndex}>{value}</td>
        //                 ))}
        //             </tr>
        //         ))}
        //     </tbody>
        // </table>
    );
};

export default ExcelComponent;
