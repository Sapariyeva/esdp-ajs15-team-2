import { useState } from 'react';
import { setActions } from '../features/configureSlice';
import { Form, Input, Select, Switch, Slider, Button, Card, Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { Footer } from 'antd/es/layout/layout';

const { Option } = Select;

interface ConfigureProps {
  startGame: () => void;
}

export function Configure({ startGame }: ConfigureProps) {
  const dispatch = useAppDispatch();
  const configure = useAppSelector((state) => state.configure);
  const [userActions, setUserActions] = useState<string[]>(configure.actions);

  const handleActionChange = (index: number, value: string) => {
    const newActions = [...userActions];
    newActions[index] = value;
    setUserActions(newActions);
    dispatch(setActions(newActions));
  };

  const handleAddAction = () => {
    const newActions = [...userActions, ''];
    setUserActions(newActions);
    dispatch(setActions(newActions));
  };

  return (
    <Row justify="center" style={{ marginTop: '20px' }}>
      <Col xs={24} sm={20} md={16} lg={12} >
        <Card title="Настройка сессии">
          <Form layout="vertical">
            <Form.Item label="Безошибочное изучение">
              <Switch />
            </Form.Item>

            <Form.Item label="Формат сессии">
              <Select>
                <Option value="Покажи">Покажи</Option>
                <Option value="Сортировка">Сортировка</Option>
                <Option value="Назови">Назови</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Глаголы в изучении">
              {userActions.map((action, index) => (
                <Input
                  key={index}
                  value={action}
                  onChange={(e) => handleActionChange(index, e.target.value)}
                  style={{ marginBottom: '8px' }}
                />
              ))}
              <Button type="dashed" onClick={handleAddAction} style={{ width: '100%' }}>+</Button>
            </Form.Item>

            <Form.Item label="Ротация">
              <Slider min={1} max={9} />
            </Form.Item>

            <Form.Item label="Использовать статичный или динамичный контент">
              <Select>
                <Option value="Фото">Фото</Option>
                <Option value="Видео">Видео</Option>
                <Option value="Фото/Видео">Фото/Видео</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Интерактивная концовка">
              <Switch />
            </Form.Item>

            <Form.Item label="Анимированное поощрение">
              <Switch />
            </Form.Item>

            <Form.Item label="Тип поощрения">
              <Select>
                <Option value="Смайл">Смайл</Option>
                <Option value="Звезда">Звезда</Option>
                <Option value="Аплодисменты">Аплодисменты</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Изменение положения карточки при ошибке">
              <Switch />
            </Form.Item>

            <Form.Item label="Критерий успешности (КУ)">
              <Slider min={0} max={100} />
            </Form.Item>

            <Form.Item label="Сколько сессий подряд должен быть достигнут КУ">
              <Slider min={1} max={8} />
            </Form.Item>

            <Form.Item label="Подсказки">
              <Switch />
            </Form.Item>

            <Form.Item label="Колличество ошибок для автоматической подсказки">
              <Slider min={1} max={3} />
            </Form.Item>

            <Form.Item label="Лимит подсказок">
              <Slider min={1} max={3} />
            </Form.Item>

            <Form.Item label="Звук">
              <Switch />
            </Form.Item>

            <Footer style={{backgroundColor: 'white', borderTop: 2, borderTopStyle: 'solid', borderTopColor: 'whitesmoke' }}>
              <Form.Item>
                <Button style={{margin: 3}} type="primary" onClick={startGame}>
                  Начать
                </Button>
                <Button style={{margin: 3}} type="default" >
                  Использовать предыдущие настройки
                </Button>
                <Button style={{margin: 3}} type="default" >
                  Поделиться игрой
                </Button>
              </Form.Item>
            </Footer>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
