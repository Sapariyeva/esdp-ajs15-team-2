import { useState } from 'react';
import { Form, Col, Row, Layout, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { Slider } from '@/components/UI/Slider/Slider';
import { Switch } from '@/components/UI/Switch/Switch';
import { Select } from '@/components/UI/Select/Select';
import { Title } from '@/components/UI/Title/Title';
import { ConfigureButton } from '@/components/UI/ConfigureButton/ConfigureButton';
import { Button } from '@/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setSessionFormat, setErrorlessLearning, setRotation,
    setInteractiveEnd, setEncouragement, setEncouragementSwitch,
    setCardPosition, setHints, setAutoHints, setHintsLimit,
    setSound, setSuccessCriterion,
} from '@/features/configureSlice';

const { Footer } = Layout;

interface ConfigureProps {
  visible: boolean;
  onClose?: () => void;
  startGame: () => void;
}

export function Configure({ visible, onClose, startGame }: ConfigureProps) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { sessionFormat, isErrorlessLearning, actions, rotation, interactiveEnd,
      encouragement, encouragementSwitch, cardPosition, hints, autoHints, hintsLimit,
      sound, successCriterion
    } = useAppSelector(state => state.configure);

    const [selectedContents, setSelectedContents] = useState('photo');

    const games = [
        { value: t('show'), label: t('show') },
        { value: t('sorting'), label: t('sorting') },
        { value: t('name'), label: t('name') },
    ];

    const content = [
        { value: t('photo') , label: t('photo') },
        { value: t('video'), label: t('video') },
        { value: t('photo_video'), label: t('photo_video') },
    ];

    const encouragements = [
        { value: t('smile'), label: t('smile') },
        { value: t('star'), label: t('star') },
        { value: t('applause'), label: t('applause') },
    ];

    const handleStartGame = () => {
        startGame();
    };

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
                                <Switch 
                                    style={{marginLeft: '30px'}}
                                    checked={isErrorlessLearning}
                                    onChange={(checked) => dispatch(setErrorlessLearning(checked))}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item style={{margin: '0'}}>
                            <Title text={t('session_format')} style={{margin: '0', paddingBottom: '10px',fontSize: '20px', color: '#1C1B1F', fontWeight: 'bold'}}></Title>
                            <Select
                                type="inline"
                                options={games}
                                defaultValue={sessionFormat}
                                onChange={(value) => dispatch(setSessionFormat(value))}
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
                                    // disabled={isErrorlessLearning}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                            <Title text={t('success_criteria')} style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', fontWeight: 'bold'}}></Title>
                            <Slider 
                                min={0} max={100}
                                value={successCriterion}
                                onChange={(value) => dispatch(setSuccessCriterion(value))}
                                // disabled={isErrorlessLearning}
                            />
                        </Form.Item>

                        <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                            <Title text={t('consecutive_sessions_for_success')} style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', fontWeight: 'normal'}}></Title>
                            <Slider 
                                min={1} max={8}
                                // disabled={isErrorlessLearning} 
                                />
                        </Form.Item>

                        <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '315px'}}>
                                <Title text={t('hints')} style={{fontSize: '20px', fontWeight: 'normal'}}></Title>
                                <Switch 
                                    style={{marginLeft: '30px'}}
                                    checked={hints}
                                    onChange={(checked) => dispatch(setHints(checked))}
                                    // disabled={isErrorlessLearning}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                            <Title text={t('errors_for_auto_hint')} style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', fontWeight: 'normal'}}></Title>
                            <Slider 
                                min={1} max={3}
                                value={autoHints}
                                onChange={(value) => dispatch(setAutoHints(value))}
                                // disabled={isErrorlessLearning}
                            />
                        </Form.Item>

                        <Form.Item style={{margin: '0', color: isErrorlessLearning ? '#D9D9D9' : '#1C1B1F'}}>
                            <Title text={t('hint_limit')} style={{margin: '0', paddingBottom: '27px', marginTop: '20px', fontSize: '20px', fontWeight: 'normal'}}></Title>
                            <Slider 
                                min={1} max={3}
                                value={hintsLimit}
                                onChange={(value) => dispatch(setHintsLimit(value))} 
                                // disabled={isErrorlessLearning} 
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
                                    onClick={handleStartGame}
                                ></Button>
                                <Button 
                                    style={{ width: '363px', height: '58px', margin: '10px', padding: '16px 24px', fontSize: '20px' }} 
                                    type="default" 
                                    title={t('use_previous_settings')} 
                                    size="md"
                                ></Button>
                                <Button 
                                    style={{ width: '234px', height: '58px', margin: '10px', padding: '16px 24px', fontSize: '20px' }} 
                                    type="default" 
                                    title={t('share_game')} 
                                    size="md"
                                ></Button>
                            </Form.Item>
                        </Footer>
                    </Form>
                </Col>
            </Row>
        </Modal>
    );
}
