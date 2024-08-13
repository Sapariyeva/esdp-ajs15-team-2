import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/UI/Input/Input";
import { Button } from "@/components/UI/Button/Button";
import { Modal } from "@/components/UI/Modal/Modal";
import settingsHeart from "@/assets/images/icons/settings_heart.svg";
import { Theme, useMediaQuery } from "@mui/material";
import { Title } from "@/components/UI/Title/Title";

interface EmployeeData {
  name: string;
  id: number;
}

export function Employees() {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function addNewEmployee(): void {
    setCurrentEmployee({ name: "", id: Date.now() });
    setIsEditing(true);
  }

  function editEmployee(employee: EmployeeData): void {
    setCurrentEmployee(employee);
    setIsEditing(true);
  }

  function saveEmployee(): void {
    if (currentEmployee) {
      setEmployees((prev) =>
        prev.some((emp) => emp.id === currentEmployee.id)
          ? prev.map((emp) =>
              emp.id === currentEmployee.id ? currentEmployee : emp
            )
          : [...prev, currentEmployee]
      );
    }
    setIsEditing(false);
  }

  function cancelEdit(): void {
    setIsEditing(false);
    setCurrentEmployee(null);
  }

  function deleteEmployee(employee: EmployeeData): void {
    setIsModalVisible(true);
    setCurrentEmployee(employee);
  }

  function confirmDeleteEmployee(): void {
    if (currentEmployee) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== currentEmployee.id));
    }
    closeModal();
  }

  function closeModal(): void {
    setIsModalVisible(false);
    setCurrentEmployee(null);
  }

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const inputSize = isLargeScreen ? "220px" : "300px";
  const buttonWidth = isLargeScreen ? "100px" : "120px";
  const buttonSpacing = isSmallScreen ? "4px" : "8px";
  const buttonSize = isLargeScreen ? "md" : 'lg'
  const titleSize = isLargeScreen ? '24px' : '32px'

  return (
    <div style={{ marginLeft: isSmallScreen ? "16px" : "24px", marginTop: isSmallScreen ? "20px" : "26px" }}>
      <Title text={t("inspection_employees")} style={{fontSize: titleSize}}/>
      <Button title={t("add_new_employee")} onClick={addNewEmployee} size={buttonSize} type="primary" style={{ marginBottom: "20px" }} />

      {currentEmployee && (
        <div className="employee-edit-section" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Title text={t("emoloyee")} style={{fontSize: titleSize}}>
                <span style={{ color: "#FFB800", marginLeft: 10 }}>
                    {currentEmployee.name || t('reviewer_name')}
                </span>
            </Title>
            <img
                src={settingsHeart}
                alt="settings heart icon"
                onClick={() => editEmployee(currentEmployee)}
                style={{ width: 24, height: 24, cursor: "pointer" }}
            />
        </div>
      )}

      {isEditing && (
        <>
          <Input
            type="name"
            placeholder={t('reviewer_name')}
            value={currentEmployee?.name || ""}
            onChange={(e) => setCurrentEmployee({ ...currentEmployee!, name: e.target.value })}
            style={{ width: inputSize, marginBottom: "20px" }}
          />
          <div className="edit-btns-wrapper" style={{ display: "flex", gap: buttonSpacing }}>
            <Button title={t('save')} onClick={saveEmployee} size="md" type="primary" style={{ width: buttonWidth  }} />
            <Button title={t('cancel')} onClick={cancelEdit} size="md" type="default" style={{ width: buttonWidth }} />
          </div>
        </>
      )}

      {employees.map((employee) => (
        <div key={employee.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
          <Title text={employee.name} style={{fontSize: titleSize}}></Title>
          <span
            style={{
              color: "#9069CD",
              textDecoration: "underline",
              cursor: "pointer",
              marginRight: 20
            }}
            onClick={() => deleteEmployee(employee)}
          >
            {t("delete_employee")}
          </span>
        </div>
      ))}

      <Modal visible={isModalVisible} title={t("are_you_sure_you_want_to_remove_the_employee")} onClose={closeModal} style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <Button title={t('yes')} onClick={confirmDeleteEmployee} size="md" type="default" style={{ width: 111 }} />
          <Button title={t('cancel')} onClick={closeModal} size="md" type="primary" style={{ width: 111 }} />
        </div>
      </Modal>
    </div>
  );
}
