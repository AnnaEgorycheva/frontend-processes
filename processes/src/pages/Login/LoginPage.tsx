import { Button, Card, Form, Input, Layout, Space } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    const [submittable, setSubmittable] = React.useState(false);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
          () => { setSubmittable(true); },
          () => { setSubmittable(false);},
        );
    }, [values]);
    
    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 50 }}>
                <Card style={{ width: 600, margin: '0 auto', textAlign: 'center' }}>
                    <Title level={3} style={{ marginTop: 0 }}>Вход</Title>
                    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                        <Form.Item name="login" label="Логин" rules={[{ required: true, message: 'Введите логин' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Введите пароль' }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" disabled={!submittable}>
                                    Вход
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </Layout>
        </>
    )
}

export default LoginPage;