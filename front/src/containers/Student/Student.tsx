import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/UI/Input/Input";
import { Button } from "@/components/UI/Button/Button";
import { Modal } from "@/components/UI/Modal/Modal";
import settingsHeart from "@/assets/images/icons/settings_heart.svg";
import { Theme, useMediaQuery } from "@mui/material";
import { Title } from "@/components/UI/Title/Title";
import { DownloadOutlined } from '@ant-design/icons';
import ExcelJS from 'exceljs';

interface StudentData {
  name: string;
  id: number;
}

export function Students() {
  const { t } = useTranslation();
  const [students, setStudents] = useState<StudentData[]>([]);
  const [currentStudent, setCurrentStudent] = useState<StudentData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [excelData, setExcelData] = useState<string[][] | null>(null);

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const inputSize = isLargeScreen ? "220px" : "300px";
  const buttonWidth = isLargeScreen ? "100px" : "120px";
  const buttonSpacing = isSmallScreen ? "4px" : "8px";
  const buttonSize = isLargeScreen ? "md" : 'lg'
  const titleSize = isLargeScreen ? '24px' : '32px'

  function addNewStudent(): void {
    setCurrentStudent({ name: "", id: Date.now() });
    setIsEditing(true);
  }

  function editStudent(student: StudentData): void {
    setCurrentStudent(student);
    setIsEditing(true);
  }

  function saveStudent(): void {
    if (currentStudent) {
      setStudents((prev) =>
        prev.some((std) => std.id === currentStudent.id)
          ? prev.map((std) =>
              std.id === currentStudent.id ? currentStudent : std
            )
          : [...prev, currentStudent]
      );
    }
    setIsEditing(false);
  }

  function cancelEdit(): void {
    setIsEditing(false);
    setCurrentStudent(null);
  }

  function deleteStudent(student: StudentData): void {
    setIsModalVisible(true);
    setCurrentStudent(student);
  }

  function confirmDeleteStudent(): void {
    if (currentStudent) {
      setStudents((prev) => prev.filter((std) => std.id !== currentStudent.id));
    }
    closeModal();
  }

  function closeModal(): void {
    setIsModalVisible(false);
    setCurrentStudent(null);
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const buffer = event.target?.result as ArrayBuffer;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);

      const worksheet = workbook.worksheets[0];
      const data: string[][] = [];
      worksheet.eachRow((row) => {
        const rowData: string[] = [];
        row.eachCell((cell) => {
          rowData.push(cell.value ? cell.value.toString() : '');
        });
        data.push(rowData);
      });

      setExcelData(data);
      const importedStudents = data.slice(1).map(row => ({
        name: row[0],
        id: Number(row[1]),
      }));
      setStudents([...students, ...importedStudents]);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ marginLeft: isSmallScreen ? "16px" : "24px", marginTop: isSmallScreen ? "20px" : "26px" }}>
        <Title text={t("student_list")} style={{fontSize: titleSize}}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px' }}>
            <Button title={t("add_new_student")} onClick={addNewStudent} size={buttonSize} type="primary" style={{margin: 0}} />
            <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            />
            <label htmlFor="file-upload" style={{
            display: 'inline-block',
            width: buttonSize === 'md' ? '200px' : '300px',
            height: buttonSize === 'md' ? '48px' : '57.9px',
            borderRadius: '10px',
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'center',
            lineHeight: buttonSize === 'md' ? '40px' : '48px',
            cursor: 'pointer',
            border: '1px solid black',
            padding: 5,
            margin: 0
            }}>
                <DownloadOutlined style={{ marginRight: '8px' }} />
                {t("import_student_data")}
        </label>
        </div>

      {currentStudent && (
        <div className="student-edit-section" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Title text={t("student")} style={{fontSize: titleSize}}>
                <span style={{ color: "#FFB800", marginLeft: 10 }}>
                    {currentStudent.name || t('student_name')}
                </span>
            </Title>
            <img
                src={settingsHeart}
                alt="settings heart icon"
                onClick={() => editStudent(currentStudent)}
                style={{ width: 24, height: 24, cursor: "pointer" }}
            />
        </div>
      )}

      {isEditing && (
        <>
          <Input
            type="name"
            placeholder={t('student_name')}
            value={currentStudent?.name || ""}
            onChange={(e) => setCurrentStudent({ ...currentStudent!, name: e.target.value })}
            style={{ width: inputSize, marginBottom: "20px" }}
          />
          <div className="edit-btns-wrapper" style={{ display: "flex", gap: buttonSpacing }}>
            <Button title={t('save')} onClick={saveStudent} size="md" type="primary" style={{ width: buttonWidth  }} />
            <Button title={t('cancel')} onClick={cancelEdit} size="md" type="default" style={{ width: buttonWidth }} />
          </div>
        </>
      )}

      {students.map((student) => (
        <div key={student.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
          <Title text={student.name} style={{fontSize: titleSize}}></Title>
          <span
            style={{
              color: "#9069CD",
              textDecoration: "underline",
              cursor: "pointer",
              marginRight: 20
            }}
            onClick={() => deleteStudent(student)}
          >
            {t("delete_student")}
          </span>
        </div>
      ))}

      <Modal visible={isModalVisible} title={t("are_you_sure_you_want_to_remove_the_student")} onClose={closeModal} style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <Button title={t('yes')} onClick={confirmDeleteStudent} size="md" type="default" style={{ width: 111 }} />
          <Button title={t('cancel')} onClick={closeModal} size="md" type="primary" style={{ width: 111 }} />
        </div>
      </Modal>
    </div>
  );
}
