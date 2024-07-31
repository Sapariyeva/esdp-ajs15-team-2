import { useState, useEffect } from 'react';
import { Form, Col, Row, Layout, Modal, Button as AntdButton, Switch } from 'antd';
import { 
  setSessionFormat, 
  setErrorlessLearning, 
  setRotation,
  setInteractiveEnd,
  setEncouragement,
  setEncouragementSwitch,
  setCardPosition,
  setHints,
  setAutoHints,
  setHintsLimit,
  setSound,
  setSuccessCriterion,
  fetchCards,
  setSelectedCategories,
  setErrorHandling
} from '../../../features/configureSlice';
import './Configure.css'; 
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Title } from '@/components/UI/Title/Title';
import { Select } from '@/components/UI/Select/Select';
import { ConfigureButton } from '@/components/UI/ConfigureButton/ConfigureButton';
import { Slider } from '@/components/UI/Slider/Slider';
import { Button } from '@/components/UI/Button/Button';

const { Footer } = Layout;

interface ConfigureProps {
  startGame: () => void;
  visible: boolean;
  onClose: () => void;
}

export function Configure({ visible, onClose, startGame }: ConfigureProps) {
  const [selectedContents, setSelectedContents] = useState('Фото');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const sessionFormat = useAppSelector((state) => state.configure.sessionFormat); 
  const isErrorlessLearning = useAppSelector((state) => state.configure.isErrorlessLearning); 
  const rotation = useAppSelector((state) => state.configure.rotation); 
  const interactiveEnd = useAppSelector((state) => state.configure.interactiveEnd); 
  const encouragement = useAppSelector((state) => state.configure.encouragement); 
  const encouragementSwitch = useAppSelector((state) => state.configure.encouragementSwitch); 
  const cardPosition = useAppSelector((state) => state.configure.cardPosition); 
  const hints = useAppSelector((state) => state.configure.hints); 
  const autoHints = useAppSelector((state) => state.configure.autoHints); 
  const hintsLimit = useAppSelector((state) => state.configure.hintsLimit); 
  const sound = useAppSelector((state) => state.configure.sound); 
  const successCriterion = useAppSelector((state) => state.configure.successCriterion); 
  const cards = useAppSelector((state) => state.configure.cards);
  const selectedCategories = useAppSelector((state) => state.configure.selectedCategories);
  const errorHandling = useAppSelector((state)=> state.configure.errorHandling)

  const games = [
    { value: 'Покажи', label: 'Покажи' },
    { value: 'Сортировка', label: 'Сортировка' },
    { value: 'Назови', label: 'Назови' },
  ];

  const content = [
    { value: 'Фото', label: 'Фото' },
    { value: 'Видео', label: 'Видео' },
    { value: 'Фото/Видео', label: 'Фото/Видео' },
  ];

  const encouragements = [
    { value: 'Смайлик', label: 'Смайлик' },
    { value: 'Звезда', label: 'Звезда' },
    { value: 'Аплодисменты', label: 'Аплодисменты' },
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
            <Title style={{fontSize: '32px', color: '#1C1B1F'}} text="Настройка сессии" level={1}></Title>
            <Form layout="vertical">
              <Form.Item style={{ margin: '0' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px' }}>
                  <Title text="Безошибочное изучение" style={{ fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal' }}></Title>
                  <Switch
                    style={{ marginLeft: '30px' }}
                    checked={isErrorlessLearning}
                    onChange={(checked) => dispatch(setErrorlessLearning(checked))}
                  />
                </div>
              </Form.Item>

              <Form.Item style={{ margin: '0' }}>
                <Title text="Формат сессии" style={{ margin: '0', paddingBottom: '10px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'bold' }}></Title>
                <Select
                  type="inline"
                  options={games}
                  defaultValue={sessionFormat}
                  onChange={(value) => dispatch(setSessionFormat(value))}
                />
              </Form.Item>

              <Form.Item style={{margin: '0'}}>
                <Title text="Глаголы в изучении" style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'bold'}}></Title>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <ConfigureButton style={{width: '72px', height: '56px'}} label="+" isAddButton onClick={openModal} />
                  {selectedCategories.map((category, index) => (
                    <ConfigureButton style={{width: '109px', height: '53px'}} key={index} label={category} />
                  ))}
                </div>
              </Form.Item>

              <Form.Item style={{margin: '0'}}>
                <Title text="Ротация" style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                <Slider 
                  min={1} max={9}
                  value={rotation}
                  onChange={(value) => dispatch(setRotation(value))}
                />
              </Form.Item>

              <Form.Item style={{margin: '0'}}>
                <Title text="Использовать статичный или динамичный контент" style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                <Select
                  type="inline"
                  options={content}
                  defaultValue={selectedContents}
                  onChange={(value) => setSelectedContents(value)}
                />
              </Form.Item>

              <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px'}}>
                  <Title text="Интерактивная концовка" style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                  <Switch 
                    style={{marginLeft: '30px'}}
                    checked={interactiveEnd}
                    onChange={(checked) => dispatch(setInteractiveEnd(checked))}
                  />
                </div>
              </Form.Item>

              <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '600px'}}>
                  <Title text="Анимированное поощрение" style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
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
                  <Title text="Изменение положения карточки при ошибке" style={{fontSize: '20px', fontWeight: 'normal'}}></Title>
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
                  <Title text="Поведение карточки при ошибке:" style={{fontSize: '20px', fontWeight: 'normal'}}></Title>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '336px'}}>
                    <Title text='Откладывание' style={{fontSize: '20px', fontWeight: 'normal', color: errorHandling ? '#D9D9D9' : '#1C1B1F'}}/>
                    <Switch 
                      checked={errorHandling}
                      onChange={(checked) => dispatch(setErrorHandling(checked))}
                    />
                    <Title text='Подмена' style={{fontSize: '20px', fontWeight: 'normal', color: errorHandling ? '#1C1B1F' : '#D9D9D9'}}/>
                  </div>
                </div>
              </Form.Item>

              <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                <Title text="Критерий успешности (КУ)" style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', fontWeight: 'bold'}}></Title>
                <Slider 
                  min={0} max={100}
                  value={successCriterion}
                  onChange={(value) => dispatch(setSuccessCriterion(value))}
                  disabled={isErrorlessLearning}
                />
              </Form.Item>

              <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                <Title text="Сколько сессий подряд должен быть достигнут КУ"style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', fontWeight: 'normal'}}></Title>
                <Slider 
                  min={1} max={8} 
                  disabled={isErrorlessLearning}
                />
              </Form.Item>

              <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px'}}>
                  <Title text="Подсказки" style={{fontSize: '20px', fontWeight: 'normal'}}></Title>
                  <Switch 
                    style={{marginLeft: '30px'}}
                    checked={hints}
                    onChange={(checked) => dispatch(setHints(checked))}
                    disabled={isErrorlessLearning}
                  />
                </div>
              </Form.Item>

              <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                <Title text="Количество ошибок для автоматической подсказки" style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', fontWeight: 'normal'}}></Title>
                <Slider
                  min={1} max={3}
                  value={autoHints}
                  onChange={(value) => dispatch(setAutoHints(value))}
                  disabled={isErrorlessLearning}
                />
              </Form.Item>

              <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                <Title text="Лимит подсказок" style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', fontWeight: 'normal'}}></Title>
                <Slider 
                  min={1} max={3}
                  value={hintsLimit}
                  onChange={(value) => dispatch(setHintsLimit(value))} 
                  disabled={isErrorlessLearning}
                />
              </Form.Item>

              <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px'}}>
                  <Title text="Звук" style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
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
                    title="Начать" 
                    size="md" 
                    onClick={handleStartGame}>
                  </Button>
                  <Button 
                    style={{ width: '363px', height: '58px', margin: '10px', padding: '16px 24px', fontSize: '20px' }} 
                    type="default" 
                    title="Использовать предыдущие настройки" 
                    size="md">
                  </Button>
                  <Button 
                    style={{ width: '234px', height: '58px', margin: '10px', padding: '16px 24px', fontSize: '20px' }} 
                    type="default" 
                    title="Поделиться игрой" 
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
        title="Доступные глаголы:" 
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
