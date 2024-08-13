import { useState, useEffect } from 'react';
import { Form, Col, Row, Layout, Modal, Button as AntdButton, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { setSessionFormat, setErrorlessLearning, setRotation,
  setInteractiveEnd, setEncouragement, setEncouragementSwitch,
  setCardPosition, setHints, setAutoHints, setHintsLimit,
  setSound, setSuccessCriterion, fetchCards, 
  setSelectedCategories, setErrorHandling
} from '@/features/configureSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Title } from '@/components/UI/Title/Title';
import { Select } from '@/components/UI/Select/Select';
import { ConfigureButton } from '@/components/UI/ConfigureButton/ConfigureButton';
import { Slider } from '@/components/UI/Slider/Slider';
import { Button } from '@/components/UI/Button/Button';
import './Configure.css';

const { Footer } = Layout;

interface ConfigureProps {
  startGame: () => void;
  visible: boolean;
  onClose: () => void;
}

export function Configure({ visible, onClose, startGame }: ConfigureProps) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { sessionFormat, isErrorlessLearning, rotation, interactiveEnd,
    encouragement, encouragementSwitch, cardPosition, hints, autoHints, hintsLimit,
    sound, successCriterion, selectedCategories, errorHandling, cards
  } = useAppSelector(state => state.configure);

  const [selectedContents, setSelectedContents] = useState(t('photo'));
  const [isModalVisible, setIsModalVisible] = useState(false);

  const games = [
    { value: t('show'), label: t('show') },
    { value: t('sorting'), label: t('sorting') },
    { value: t('name'), label: t('name') },
  ];

  const content = [
    { value: t('photo') , label: t('photo') },
    { value: t('video'), label: t('video') },
    { value: t('photo_video'), label: t('photo_video')},
  ];

  const encouragements = [
    { value: t('smile'), label: t('smile') },
    { value: t('star'), label: t('star') },
    { value: t('applause'), label: t('applause')},
  ];

  useEffect(() => {
    dispatch(fetchCards()); 
  }, [dispatch]);

  const handleStartGame = () => {
    startGame();
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      dispatch(setSelectedCategories(selectedCategories.filter(c => c !== category)));
    } else {
      dispatch(setSelectedCategories([...selectedCategories, category]));
    }
  };

  const сategories = [...new Set(cards.map(card => card.category))];

  return (
    <>
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        width={837}
      >
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col style={{ maxWidth: '900px' }}>
            <Title style={{fontSize: '32px', color: '#1C1B1F'}} text={t('session_settings')} level={1}></Title>
            <Form layout="vertical">
              <Form.Item style={{ margin: '0' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px' }}>
                  <Title text={t('error_free_learning')} style={{ fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal' }}></Title>
                  <Switch
                    style={{ marginLeft: '30px' }}
                    checked={isErrorlessLearning}
                    onChange={(checked) => dispatch(setErrorlessLearning(checked))}
                  />
                </div>
              </Form.Item>

              <Form.Item style={{ margin: '0' }}>
                <Title text={t('session_format')} style={{ margin: '0', paddingBottom: '10px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'bold' }}></Title>
                <Select
                  type="inline"
                  options={games}
                  defaultValue={sessionFormat}
                  onChange={(value) => dispatch(setSessionFormat(value))}
                />
              </Form.Item>

              <Form.Item style={{margin: '0'}}>
                <Title text={t('verbs_in_study')} style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'bold'}}></Title>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <ConfigureButton style={{width: '72px', height: '56px'}} label="+" isAddButton onClick={openModal} />
                  {selectedCategories.map((category, index) => (
                    <ConfigureButton style={{width: '109px', height: '53px'}} key={index} label={category} />
                  ))}
                </div>
              </Form.Item>

              <Form.Item style={{margin: '0'}}>
                <Title text={t('rotation')} style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                <Slider 
                  min={1} max={9}
                  value={rotation}
                  onChange={(value) => dispatch(setRotation(value))}
                />
              </Form.Item>

              <Form.Item style={{margin: '0'}}>
                <Title text={t('use_static_dynamic_content')} style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                <Select
                  type="inline"
                  options={content}
                  defaultValue={selectedContents}
                  onChange={(value) => setSelectedContents(value)}
                />
              </Form.Item>

              <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px'}}>
                  <Title text={t('interactive_ending')} style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                  <Switch 
                    style={{marginLeft: '30px'}}
                    checked={interactiveEnd}
                    onChange={(checked) => dispatch(setInteractiveEnd(checked))}
                  />
                </div>
              </Form.Item>

              <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '600px'}}>
                  <Title text={t('animated_reward')} style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                  <Switch 
                    style={{marginLeft: '30px'}}
                    checked={encouragementSwitch}
                    onChange={(checked) => dispatch(setEncouragementSwitch(checked))}
                  />
                  <Form.Item style={{margin: '0'}}>
                    <Select
                      style={{marginLeft: '30px'}}
                      options={encouragements}
                      defaultValue={encouragement}
                      onChange={(value) => dispatch(setEncouragement(value))}
                      type="default"
                    />
                  </Form.Item>
                </div>
              </Form.Item>

              <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '510px', justifyContent: 'space-between'}}>
                  <Title text={t('card_position_change_on_error')} style={{fontSize: '20px', fontWeight: 'normal'}}></Title>
                  <Switch 
                    style={{marginLeft: '30px'}}
                    checked={cardPosition}
                    onChange={(checked) => dispatch(setCardPosition(checked))}
                    disabled={isErrorlessLearning}
                  />
                </div>
              </Form.Item>

              <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left', width: '510px', justifyContent: 'space-between'}}>
                  <Title text={t('card_behavior_on_error')} style={{fontSize: '20px', fontWeight: 'normal'}}></Title>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '336px'}}>
                    <Title text={t('postponement')} style={{fontSize: '20px', fontWeight: 'normal', color: errorHandling ? '#D9D9D9' : '#1C1B1F'}}/>
                    <Switch 
                      checked={errorHandling}
                      onChange={(checked) => dispatch(setErrorHandling(checked))}
                    />
                    <Title text={t('replacement')} style={{fontSize: '20px', fontWeight: 'normal', color: errorHandling ? '#1C1B1F' : '#D9D9D9'}}/>
                  </div>
                </div>
              </Form.Item>

              <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                <Title text={t('success_criteria')} style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', fontWeight: 'bold'}}></Title>
                <Slider 
                  min={0} max={100}
                  value={successCriterion}
                  onChange={(value) => dispatch(setSuccessCriterion(value))}
                  disabled={isErrorlessLearning}
                />
              </Form.Item>

              <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                <Title text={t('consecutive_sessions_for_success')}style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', fontWeight: 'normal'}}></Title>
                <Slider 
                  min={1} max={8} 
                  disabled={isErrorlessLearning}
                />
              </Form.Item>

              <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px'}}>
                  <Title text={t('hints')} style={{fontSize: '20px', fontWeight: 'normal'}}></Title>
                  <Switch 
                    style={{marginLeft: '30px'}}
                    checked={hints}
                    onChange={(checked) => dispatch(setHints(checked))}
                    disabled={isErrorlessLearning}
                  />
                </div>
              </Form.Item>

              <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                <Title text={t('errors_for_auto_hint')} style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', fontWeight: 'normal'}}></Title>
                <Slider
                  min={1} max={3}
                  value={autoHints}
                  onChange={(value) => dispatch(setAutoHints(value))}
                  disabled={isErrorlessLearning}
                />
              </Form.Item>

              <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                <Title text={t('hint_limit')} style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', fontWeight: 'normal'}}></Title>
                <Slider 
                  min={1} max={3}
                  value={hintsLimit}
                  onChange={(value) => dispatch(setHintsLimit(value))} 
                  disabled={isErrorlessLearning}
                />
              </Form.Item>

              <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px'}}>
                  <Title text={t('sound')} style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                  <Switch 
                    style={{marginLeft: '30px'}}
                    checked={sound}
                    onChange={(checked) => dispatch(setSound(checked))}
                  />
                </div>
              </Form.Item>

              <Footer style={{ backgroundColor: 'white', borderTop: '2px solid whitesmoke', padding: '0' }}>
                <Form.Item style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Button 
                    style={{ width: '108px', height: '58px', margin: '10px', padding: '16px 24px', fontSize: '20px' }} 
                    type="primary" 
                    title={t('start')} 
                    size="md" 
                    onClick={handleStartGame}>
                  </Button>
                  <Button 
                    style={{ width: '363px', height: '58px', margin: '10px', padding: '16px 24px', fontSize: '20px' }} 
                    type="default" 
                    title={t('use_previous_settings')} 
                    size="md">
                  </Button>
                  <Button 
                    style={{ width: '234px', height: '58px', margin: '10px', padding: '16px 24px', fontSize: '20px' }} 
                    type="default" 
                    title={t('share_game')} 
                    size="md">
                  </Button>
                </Form.Item>
              </Footer>
            </Form>
          </Col>
        </Row>
      </Modal>

      <Modal 
        open={isModalVisible} 
        onCancel={closeModal} 
        footer={null} 
        title={t('available_verbs')}
        width={800}
        className="custom-modal"
        >
        <div className="custom-modal-content">
          {сategories.map((category, index) => (
            <AntdButton 
              key={index} 
              className="verb-button" 
              onClick={() => toggleCategory(category)}
              style={{
                borderColor: selectedCategories.includes(category) ? '#9069cd' : undefined,
              }}
            >
              {category}
            </AntdButton>
          ))}
        </div>
      </Modal>
    </>
  );
}
