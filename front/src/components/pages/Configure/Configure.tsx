import { useState } from 'react';
import { Form, Col, Row, Layout, Modal } from 'antd';
import { Slider } from '@/components/UI/Slider/Slider';
import { Switch } from '@/components/UI/Switch/Switch';
import { Select } from '@/components/UI/Select/Select';
import { Title } from '@/components/UI/Title/Title';
import { ConfigureButton } from '@/components/UI/ConfigureButton/ConfigureButton';
import { Button } from '@/components/UI/Button/Button';

const { Footer } = Layout;

interface ConfigureProps {
  visible: boolean;
  onClose: () => void;
}

export function Configure({ visible, onClose }: ConfigureProps) {
  const [selectedGames, setSelectedGames] = useState('Покажи');
  const [selectedContents, setSelectedContents] = useState('Фото');
  const [selectedEncouragement, setSelectedEncouragement] = useState('Звезда');
  const [actions, setActions] = useState(['Бегать', 'Спать', 'Прыгать', 'Нюхать', 'Летать']);

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

  return (
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
            <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px'}}>
                    <Title text="Безошибочное изучение" style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                    <Switch style={{marginLeft: '30px'}}/>
                </div>
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text="Формат сессии" style={{margin: '0', paddingBottom: '10px',fontSize: '20px', color: '#1C1B1F', fontWeight: 'bold'}}></Title>
                <Select
                    type="inline"
                    options={games}
                    defaultValue={selectedGames}
                    onChange={(value) => setSelectedGames(value)}
                />
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text="Глаголы в изучении" style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'bold'}}></Title>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ConfigureButton style={{width: '72px', height: '56px'}} label="+" isAddButton />
                  {actions.map((action, index) => (
                    <ConfigureButton style={{width: '109px', height: '53px'}} key={index} label={action} />
                  ))}
                </div>
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text="Ротация" style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                <Slider min={1} max={9} />
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
                    <Switch style={{marginLeft: '30px'}}/>
                </div>
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '600px'}}>
                    <Title text="Анимированное поощрение" style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                    <Switch style={{marginLeft: '30px'}}/>
                    <Form.Item style={{margin: '0'}}>
                        <Select
                            style={{marginLeft: '30px'}}
                            options={encouragements}
                            defaultValue={selectedEncouragement}
                            onChange={(value) => setSelectedEncouragement(value)}
                            type="default"
                        />
                    </Form.Item>
                </div>
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '510px', justifyContent: 'space-between'}}>
                    <Title text="Изменение положения карточки при ошибке" style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                    <Switch style={{marginLeft: '30px'}}/>
                </div>
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text="Критерий успешности (КУ)" style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'bold'}}></Title>
                <Slider min={0} max={100} />
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text="Сколько сессий подряд должен быть достигнут КУ"style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                <Slider min={1} max={8} />
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px'}}>
                    <Title text="Подсказки" style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                    <Switch style={{marginLeft: '30px'}}/>
                </div>
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text="Количество ошибок для автоматической подсказки" style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                <Slider min={1} max={3} />
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text="Лимит подсказок" style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                <Slider min={1} max={3} />
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px'}}>
                    <Title text="Звук" style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                    <Switch style={{marginLeft: '30px'}}/>
                </div>
            </Form.Item>

            <Footer style={{ backgroundColor: 'white', borderTop: '2px solid whitesmoke', padding: '0' }}>
                <Form.Item style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button style={{ width: '108px', height: '58px', margin: '10px', padding: '16px 24px', fontSize: '20px' }} type="primary" title="Начать" size="md"></Button>
                    <Button style={{ width: '363px', height: '58px', margin: '10px', padding: '16px 24px', fontSize: '20px' }} type="default" title="Использовать предыдущие настройки" size="md"></Button>
                    <Button style={{ width: '234px', height: '58px', margin: '10px', padding: '16px 24px', fontSize: '20px' }} type="default" title="Поделиться игрой" size="md"></Button>
                </Form.Item>
            </Footer>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
}
