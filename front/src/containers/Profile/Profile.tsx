import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/UI/Input/Input";
import { Button } from "@/components/UI/Button/Button";
import { Modal } from "@/components/UI/Modal/Modal";
import settingsHeart from "@/assets/images/icons/settings_heart.svg";
import { Theme, useMediaQuery } from "@mui/material";

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  function editReviewerProfile(): void {
    setIsEditingReviewer(true);
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

  function closeModal(): void {
    setIsModalVisible(false);
  }

  function deleteProfile(): void {
    setIsModalVisible(false);
    throw new Error("Function not implemented.");
  }

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const inputSize = isSmallScreen ? '180px' : '300px';
  const buttonWidth = isSmallScreen ? '90px' : '120px';
  const buttonFontSize = isSmallScreen ? '10px' : '14px';
  const buttonSpacing = isSmallScreen ? '4px' : '8px';

  return (
    <div style={{ marginLeft: isSmallScreen ? '16px' : '24px', marginTop: isSmallScreen ? '20px' : '26px' }}>
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
            style={{ width: 24, height: 24, cursor: "pointer", position: 'fixed', top: isSmallScreen ? 28 : 33, left: isSmallScreen ? 160 : 235 }}
          />
        </div>
        <div
          className="inputs-wrapper"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Input
            type="email"
            placeholder="example@gmail.com"
            style={{ width: inputSize }}
          />
          <Input
            type="password"
            placeholder={t('password')}
            required
            style={{ width: inputSize }}
          />
          {isEditingReviewer && (
            <>
              <Input
                type="password"
                placeholder={t('repeat_password')}
                required
                style={{ width: inputSize }}
              />
              <div
                className="edit-btns-wrapper"
                style={{
                  maxWidth: '300px',
                  display: "flex",
                  justifyContent: "space-between",
                  gap: buttonSpacing,
                }}
              >
                <Button
                  title={t('save')}
                  onClick={saveReviewerProfile}
                  size="md"
                  type="primary"
                  style={{ width: buttonWidth,  fontSize: buttonFontSize }}
                />
                <Button
                  title={t('cancel')}
                  onClick={cancelEditReviewerProfile}
                  size="md"
                  type="default"
                  style={{ width: buttonWidth,fontSize: buttonFontSize }}
                />
              </div>
            </>
          )}
          <div
            style={{
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "19.36px",
              color: "#9069CD",
              textDecoration: "underline",
              cursor: "pointer",
              marginTop: 50,
              marginBottom: 50,
            }}
            onClick={handleDeleteProfile}
          >
            {t('delete_profile')}
          </div>
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
            size="md"
            type="default"
            style={{ width: 111 }}
          />
          <Button
            title={t('cancel')}
            onClick={closeModal}
            size="md"
            type="primary"
            style={{ width: 111 }}
          />
        </div>
      </Modal>
    </div>
  );
}
