import { useState } from 'react';
import { Steps, Button, Modal } from 'antd';
import './Onboard.css';

const { Step } = Steps;

const Onboard = () => {
    const [current, setCurrent] = useState(0);
    const [visible, setVisible] = useState(true);

    const steps = [
        {
            title: '',
            content: 'Step 1',
            position: { top: '20%', left: '20%' },
        },
        {
            title: '',
            content: 'Step 2',
            position: { top: '25%', left: '25%' },
        },
        {
            title: '',
            content: 'Step 3',
            position: { top: '30%', left: '30%' },
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const closeModal = () => {
        setVisible(false);
    };

    const modalStyle = {
        position: 'absolute' as 'absolute',
        ...steps[current].position,
        transition: 'all 0.3s ease',
        // boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    };

    return (
        <div>
            <Modal className='test'
                title="Onboarding"
                open={visible}
                footer={null}
                onCancel={closeModal}
                style={modalStyle}
            >
                <Steps current={current}>
                    {steps.map((step, index) => (
                        <Step key={index} title={step.title} />
                    ))}
                </Steps>
                <div className="steps-content" style={{ margin: '20px 0' }}>
                    {steps[current].content}
                </div>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={closeModal}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Onboard;
