import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/UI/Input/Input";
import { Button } from "@/components/UI/Button/Button";
import { Modal } from "@/components/UI/Modal/Modal";
import settingsHeart from "@/assets/images/icons/settings_heart.svg";

interface userData {
  reviewerName: string;
  studentName: string;
  id: number;
}

export function Profile() {
  const { t } = useTranslation();
  //TODO: Удален setUserData как неиспользуемый. Ошибка при npm run build
  const [userData] = useState<userData>({ 
    reviewerName: "John", studentName: "Jane", id: 0
  });
  const [isEditingReviewer, setIsEditingReviewer] = useState(false);
  const [isEditingStudent, setIsEditingStudent] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function exportOnClick(): void {
    throw new Error("Function not implemented.");
  }

  function importOnClick(): void {
    throw new Error("Function not implemented.");
  }

  function editReviewerProfile(): void {
    setIsEditingReviewer(true);
  }

  function editStudentProfile(): void {
    setIsEditingStudent(true);
  }

  function handleDeleteProfile(): void {
    setIsModalVisible(true);
  }

  function saveReviewerProfile(): void {
    setIsEditingReviewer(false);
  }

  function cancelEditReviewerProfile(): void {
    setIsEditingReviewer(false);
  }

  function saveStudentProfile(): void {
    setIsEditingStudent(false);
  }

  function cancelEditStudentProfile(): void {
    setIsEditingStudent(false);
  }

  function closeModal(): void {
    setIsModalVisible(false);
  }

  function deleteProfile(): void {
    setIsModalVisible(false);
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <div>
        <div
          className="reviewer-section-wrapper"
          style={{ display: "flex", gap: 20, alignItems: "center" }}
        >
          <h2 style={{ maxWidth: 410 }}>
            {t('profile')} <span>{userData.reviewerName}</span>
          </h2>
          <img
            src={settingsHeart}
            alt="settings heart icon"
            onClick={editReviewerProfile}
            style={{ width: 24, height: 24, cursor: "pointer" }}
          />
        </div>
        <div
          className="inputs-wrapper"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Input
            type="name"
            placeholder={t('reviewer_name')}
            required
            style={{ width: 300 }}
          />
          <Input
            type="email"
            placeholder="example@gmail.com"
            style={{ width: 300 }}
          />
          <Input
            type="password"
            placeholder={t('password')}
            required
            style={{ width: 300 }}
          />
          {isEditingReviewer && (
            <div
              className="edit-btns-wrapper"
              style={{
                width: 300,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                title={t('save')}
                onClick={saveReviewerProfile}
                size="lg"
                type="primary"
                style={{ width: 137 }}
              />
              <Button
                title={t('cancel')}
                onClick={cancelEditReviewerProfile}
                size="lg"
                type="default"
                style={{ width: 137 }}
              />
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 168 }}>
        <div
          className="student-section-wrapper"
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <h2 style={{ maxWidth: 318 }}>
            {t('student')} <span>{userData.studentName}</span>
          </h2>
          <img
            src={settingsHeart}
            alt="settings heart icon"
            onClick={editStudentProfile}
            style={{ width: 24, height: 24, cursor: "pointer" }}
          />
          <Button
            title={t('export_student_data')}
            onClick={exportOnClick}
            size="lg"
            type="default"
            style={{ width: 296 }}
          />
          <Button
            title={t('import_student_data')}
            onClick={importOnClick}
            size="lg"
            type="default"
            style={{ width: 296 }}
          />
        </div>
        <div
          className="inputs-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Input
            type="name"
            placeholder={t('student_name')}
            required
            style={{ width: 300 }}
          />
          <Input
            type="name"
            //TODO: В данном инпуте будет дата рождения, заменить placeholder
            placeholder="10 / 10 / 10"
            required
            style={{ width: 300 }}
          />
          <Input
            type="id"
            placeholder={`ID: ${userData.id}`}
            required
            style={{ width: 300 }}
          />
          {isEditingStudent && (
            <div
              className="edit-btns-wrapper"
              style={{
                width: 300,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                title={t('save')}
                onClick={saveStudentProfile}
                size="lg"
                type="primary"
                style={{ width: 137 }}
              />
              <Button
                title={t('cancel')}
                onClick={cancelEditStudentProfile}
                size="lg"
                type="default"
                style={{ width: 137 }}
              />
            </div>
          )}
        </div>
        <div
          style={{
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "19.36px",
            color: "#9069CD",
            textDecoration: "underline",
            cursor: "pointer",
            marginTop: 154,
            marginBottom: 50,
          }}
          onClick={handleDeleteProfile}
        >
          {t('delete_profile')}
        </div>
      </div>

      <Modal
        visible={isModalVisible}
        title={t('confirm_delete_profile')}
        onClose={closeModal}
        style={{ textAlign: "center" }}
      >
        <p style={{ color: "#FF6057" }}>
          {t('student_data_remain')}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <Button
            title={t('yes')}
            onClick={() => {
              deleteProfile();
              closeModal();
            }}
            size="lg"
            type="default"
            style={{ width: 111 }}
          />
          <Button
            title={t('cancel')}
            onClick={closeModal}
            size="lg"
            type="primary"
            style={{ width: 111 }}
          />
        </div>
      </Modal>
    </div>
  );
}
