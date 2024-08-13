import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    List,
    message,
    Upload,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { createSettings, deleteCard, getAllCards } from '@/features/gameSettingsSlice';
import { useNavigate } from 'react-router-dom';

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const GameSettings = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { title } = useAppSelector(store => store.settings);

    useEffect(() => {
        dispatch(getAllCards());
    }, [dispatch]);

    const [word, setWord] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [videoList, setVideoList] = useState<UploadFile[]>([]);

    // Состояния для ошибок
    const [imageError, setImageError] = useState<string | null>(null);
    const [videoError, setVideoError] = useState<string | null>(null);

    // Сохранение картинки
    const handleFileChange = (info: UploadChangeParam<UploadFile>) => {
        const newFileList = info.fileList.slice(-1);
        setFileList(newFileList);
    };

    // Сохранение видео
    const handleVideoChange = (info: UploadChangeParam<UploadFile>) => {
        const newVideoList = info.fileList.slice(-1);
        setVideoList(newVideoList);
    };

    // Сохранение категории
    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    };

    // Сохранение слова
    const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    };

    // Обработчик удаления
    const handleDelete = (id: number) => {
        dispatch(deleteCard(id));
        message.success('Карточка удалена');
        navigate('/admin_page');
    };

    // Обработчик отправки формы
    const submitFormHandler = () => {
        // Проверка на наличие изображения и видео
        if (fileList.length === 0) {
            setImageError('Пожалуйста, загрузите изображение!');
            return;
        } else {
            setImageError(null);
        }

        if (videoList.length === 0) {
            setVideoError('Пожалуйста, загрузите видео!');
            return;
        } else {
            setVideoError(null);
        }

        const formData = new FormData();
        formData.append('title', word);
        formData.append('category', category);
        formData.append('image', fileList[0].originFileObj as Blob);
        formData.append('video', videoList[0].originFileObj as Blob);

        dispatch(createSettings(formData));
        message.success('Карточка добавлена');
        navigate('/admin_page');
    };

    return (
        <>
            {/* <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                    marginLeft: '20px',
                    marginTop: '20px',
                    padding: '20px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '8px',
                    backgroundColor: '#9069CD',
                }}
                onFinish={submitFormHandler}
            >
                <Form.Item
                    label="Название карточки"
                    name="word"
                    style={{ marginBottom: '20px' }}
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите описаник карточки!',
                        },
                    ]}
                >
                    <Input onChange={handleWordChange} placeholder="Например 'собака прыгает'" />
                </Form.Item>
                <Form.Item
                    label="Введите глагол"
                    name="category"
                    style={{ marginBottom: '20px' }}
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите глагол!',
                        },
                    ]}
                >
                    <Input onChange={handleTypeChange} placeholder="Например 'играть'" />
                </Form.Item>
                <Form.Item
                    label="Загрузите изображение"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    style={{ marginBottom: '20px' }}
                >
                    <Upload
                        listType="picture-card"
                        onChange={handleFileChange}
                        fileList={fileList}
                        maxCount={1}
                        beforeUpload={() => false}
                        showUploadList={{
                            showPreviewIcon: false,
                            showRemoveIcon: true,
                        }}
                    >
                        {fileList.length >= 1 ? null : (
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                            </button>
                        )}
                    </Upload>
                    {imageError && <div style={{ color: 'red', marginTop: '10px' }}>{imageError}</div>}
                </Form.Item>

                <Form.Item
                    label="Загрузите видео"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    style={{ marginBottom: '20px' }}
                >
                    <Upload
                        listType="picture-card"
                        onChange={handleVideoChange}
                        fileList={videoList}
                        maxCount={1}
                        beforeUpload={() => false}
                        showUploadList={{
                            showPreviewIcon: false,
                            showRemoveIcon: true,
                        }}
                    >
                        {videoList.length >= 1 ? null : (
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                            </button>
                        )}
                    </Upload>
                    {videoError && <div style={{ color: 'red', marginTop: '10px' }}>{videoError}</div>}
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: '100%',
                            height: '40px',
                            backgroundColor: '#1890ff',
                            borderColor: '#1890ff',
                            borderRadius: '8px',
                        }}
                    >
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
            <div 
            style={{ 
                maxWidth: 600, 
                marginLeft: '20px', 
                marginTop: '20px',
                backgroundColor: '#9069CD', 
                border: '1px solid #d9d9d9',
                    borderRadius: '8px', }}>
                <h2 style={{ color: 'black' }}>Список карточек</h2>
                <List
                style={{ backgroundColor: '#9069CD' }}
                    bordered
                    dataSource={Array.isArray(title) ? title : []}
                    renderItem={item => (
                        <List.Item
                        style={{ border: '#9069CD' }}
                            actions={[
                                <Button
                                    key="delete"
                                    type="primary"
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDelete(item.id)}
                                />
                            ]}
                        >
                            {item.title}
                        </List.Item>
                    )}
                />
            </div> */}

            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                    margin: '20px auto',
                    padding: '20px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '8px',
                    backgroundColor: '#9069CD',
                }}
                onFinish={submitFormHandler}
            >
                <Form.Item
                    label="Название карточки"
                    name="word"
                    style={{ marginBottom: '20px' }}
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите название карточки!',
                        },
                    ]}
                >
                    <Input
                        onChange={handleWordChange}
                        placeholder="Например 'собака прыгает'"
                        style={{ borderRadius: '4px', borderColor: '#d9d9d9' }}
                    />
                </Form.Item>
                <Form.Item
                    label="Введите глагол"
                    name="category"
                    style={{ marginBottom: '20px' }}
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите глагол!',
                        },
                    ]}
                >
                    <Input
                        onChange={handleTypeChange}
                        placeholder="Например 'играть'"
                        style={{ borderRadius: '4px', borderColor: '#d9d9d9' }}
                    />
                </Form.Item>
                <Form.Item
                    label="Загрузите изображение"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    style={{ marginBottom: '20px' }}
                >
                    <Upload
                        listType="picture-card"
                        onChange={handleFileChange}
                        fileList={fileList}
                        maxCount={1}
                        beforeUpload={() => false}
                        showUploadList={{
                            showPreviewIcon: false,
                            showRemoveIcon: true,
                        }}
                        style={{ border: '1px dashed #d9d9d9', borderRadius: '4px' }}
                    >
                        {fileList.length >= 1 ? null : (
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                            </button>
                        )}
                    </Upload>
                    {imageError && <div style={{ color: 'red', marginTop: '10px' }}>{imageError}</div>}
                </Form.Item>

                <Form.Item
                    label="Загрузите видео"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    style={{ marginBottom: '20px' }}
                >
                    <Upload
                        listType="picture-card"
                        onChange={handleVideoChange}
                        fileList={videoList}
                        maxCount={1}
                        beforeUpload={() => false}
                        showUploadList={{
                            showPreviewIcon: false,
                            showRemoveIcon: true,
                        }}
                        style={{ border: '1px dashed #d9d9d9', borderRadius: '4px' }}
                    >
                        {videoList.length >= 1 ? null : (
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                            </button>
                        )}
                    </Upload>
                    {videoError && <div style={{ color: 'red', marginTop: '10px' }}>{videoError}</div>}
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: '100%',
                            height: '40px',
                            backgroundColor: '#4CAF50',
                            borderColor: '#4CAF50',
                            borderRadius: '4px',
                        }}
                    >
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
            <div
                style={{
                    maxWidth: 600,
                    margin: '20px auto',
                    backgroundColor: '#9069CD',
                    border: '1px solid #d9d9d9',
                    borderRadius: '8px',
                    padding: '20px'
                }}
            >
                <h2 style={{ color: '#333' }}>Список карточек</h2>
                <List
                    style={{ backgroundColor: '#9069CD' }}
                    bordered
                    dataSource={Array.isArray(title) ? title : []}
                    renderItem={item => (
                        <List.Item
                            style={{ borderBottom: '1px solid #d9d9d9', padding: '10px' }}
                            actions={[
                                <Button
                                    key="delete"
                                    type="primary"
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDelete(item.id)}
                                />
                            ]}
                        >
                            {item.title}
                        </List.Item>
                    )}
                />
            </div>

        </>
    );
};

export default GameSettings;