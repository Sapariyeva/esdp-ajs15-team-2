import { useState } from 'react';
import { Form, Col, Row, Layout, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { Slider } from '@/components/UI/Slider/Slider';
import { Switch } from '@/components/UI/Switch/Switch';
import { Select } from '@/components/UI/Select/Select';
import { Title } from '@/components/UI/Title/Title';
import { ConfigureButton } from '@/components/UI/ConfigureButton/ConfigureButton';
import { Button } from '@/components/UI/Button/Button';

const { Footer } = Layout;

interface ConfigureProps {
  visible: boolean;
  onClose?: () => void;
  startGame: () => void;
}

export function Configure({ visible, onClose, startGame }: ConfigureProps) {
    const { t } = useTranslation();
    const [selectedGames, setSelectedGames] = useState('show');
    const [selectedContents, setSelectedContents] = useState('photo');
    const [selectedEncouragement, setSelectedEncouragement] = useState('star');

  //TODO: Удален setActions как неиспользуемый. Ошибка при npm run build
  const [actions] = useState([t('run'), t('sleep'), t('jump'), t('smell'), t('fly')]);

  const games = [
    { value: 'show', label: t('show') },
    { value: 'sorting', label: t('sorting') },
    { value: 'name', label: t('name') },
  ];

  const content = [
    { value: 'photo', label: t('photo') },
    { value: 'video', label: t('video') },
    { value: 'photo_video', label: t('photo_video') },
  ];

  const encouragements = [
    { value: 'smile', label: t('smile') },
    { value: 'star', label: t('star') },
    { value: 'applause', label: t('applause') },
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
            <Title style={{fontSize: '32px', color: '#1C1B1F'}} text={t('session_settings')} level={1}></Title>
            <Form layout="vertical">
            <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px'}}>
                    <Title text={t('error_free_learning')} style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                    <Switch style={{marginLeft: '30px'}}/>
                </div>
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text={t('session_format')} style={{margin: '0', paddingBottom: '10px',fontSize: '20px', color: '#1C1B1F', fontWeight: 'bold'}}></Title>
                <Select
                    type="inline"
                    options={games}
                    defaultValue={selectedGames}
                    onChange={(value) => setSelectedGames(value)}
                />
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text={t('verbs_in_study')} style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'bold'}}></Title>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ConfigureButton style={{width: '72px', height: '56px'}} label="+" isAddButton />
                    {actions.map((action, index) => (
                        <ConfigureButton style={{width: '109px', height: '53px'}} key={index} label={action} />
                    ))}
                </div>
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text={t('rotation')} style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                <Slider min={1} max={9} />
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
                    <Switch style={{marginLeft: '30px'}}/>
                </div>
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '600px'}}>
                    <Title text={t('animated_reward')} style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
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
                    <Title text={t('card_position_change_on_error')} style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                    <Switch style={{marginLeft: '30px'}}/>
                </div>
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text={t('success_criteria')} style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'bold'}}></Title>
                <Slider min={0} max={100} />
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text={t('consecutive_sessions_for_success')} style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                <Slider min={1} max={8} />
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px'}}>
                    <Title text={t('hints')} style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                    <Switch style={{marginLeft: '30px'}}/>
                </div>
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text={t('errors_for_auto_hint')} style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                <Slider min={1} max={3} />
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <Title text={t('hint_limit')} style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                <Slider min={1} max={3} />
            </Form.Item>

            <Form.Item style={{margin: '0'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px'}}>
                    <Title text={t('sound')} style={{fontSize: '20px', color: '#1C1B1F', fontWeight: 'normal'}}></Title>
                    <Switch style={{marginLeft: '30px'}}/>
                </div>
            </Form.Item>

            <Footer style={{ backgroundColor: 'white', borderTop: '2px solid whitesmoke', padding: '0' }}>
                <Form.Item style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button style={{ width: '108px', height: '58px', margin: '10px', padding: '16px 24px', fontSize: '20px' }} type="primary" title={t('start')} size="md" onClick={() => startGame()}></Button>
                    <Button style={{ width: '363px', height: '58px', margin: '10px', padding: '16px 24px', fontSize: '20px' }} type="default" title={t('use_previous_settings')} size="md"></Button>
                    <Button style={{ width: '234px', height: '58px', margin: '10px', padding: '16px 24px', fontSize: '20px' }} type="default" title={t('share_game')} size="md"></Button>
                </Form.Item>
            </Footer>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
}
