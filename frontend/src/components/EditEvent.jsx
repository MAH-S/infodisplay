import React, { useState } from "react";
import { PlusOutlined, BoldOutlined, ItalicOutlined, UnderlineOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Upload,
  Typography,
  Radio,
  Select,
  ConfigProvider,
  Row,
  Col,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom";
import { theme } from "antd";
import axios from "axios";

const { TextArea } = Input;
const { Title } = Typography;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const EditEvent = () => {
  const [formType, setFormType] = useState("image");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
  };

  const onFinish = (values) => {
    setLoading(true);
    const formData = new FormData();

    // Append form fields to formData
    formData.append("title", values.title);
    formData.append("time", values.time);
    formData.append("description", values.description || "");
    formData.append("textAlign", values.alignment || "left");
    formData.append("fontSize", values.fontSize ? parseInt(values.fontSize, 10) : 16);
    formData.append("textColor", values.textColor || "#ffffff");

    // Handle image upload
    if (values.upload && values.upload.length > 0) {
      formData.append("image", values.upload[0].originFileObj);
    }

    // Send form data to backend API
    axios
      .post("http://95.177.217.236/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error saving event:", error);
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div
        style={{
          backgroundColor: "#000000",
          minHeight: "100vh",
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "30px",
            maxWidth: "800px",
            backgroundColor: "#1f1f1f",
            borderRadius: "15px",
          }}
        >
          <Title level={2} style={{ color: "#ffffff", textAlign: "center" }}>
            Edit Event
          </Title>

          <Form
            name="edit-event"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item label="Content Type">
              <Radio.Group
                onChange={handleFormTypeChange}
                value={formType}
                style={{ color: "#ffffff" }}
              >
                <Radio value="image" style={{ color: "#ffffff" }}>
                  Image Only
                </Radio>
                <Radio value="imageText" style={{ color: "#ffffff" }}>
                  Image and Text
                </Radio>
                <Radio value="text" style={{ color: "#ffffff" }}>
                  Text Only
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "#ffffff" }}>Event Title</span>}
              name="title"
              rules={[
                { required: formType !== "image", message: "Please input the event title!" },
              ]}
              labelAlign="left"
            >
              <Input
                style={{
                  backgroundColor: "#1a1a1a",
                  color: "#ffffff",
                  borderColor: "#333333",
                }}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "#ffffff" }}>Time</span>}
              name="time"
              labelAlign="left"
            >
              <Input
                style={{
                  backgroundColor: "#1a1a1a",
                  color: "#ffffff",
                  borderColor: "#333333",
                }}
              />
            </Form.Item>

            <div style={{ marginBottom: "10px" }}>
              <Row align="middle" gutter={[8, 8]} style={{ paddingBottom: "10px" }}>
                <Col>
                  <Tooltip title="Bold">
                    <Button
                      icon={<BoldOutlined />}
                      style={{ color: "#ffffff", backgroundColor: "#333333" }}
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip title="Italic">
                    <Button
                      icon={<ItalicOutlined />}
                      style={{ color: "#ffffff", backgroundColor: "#333333" }}
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip title="Underline">
                    <Button
                      icon={<UnderlineOutlined />}
                      style={{ color: "#ffffff", backgroundColor: "#333333" }}
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Form.Item label="Alignment" name="alignment">
                    <Select
                      defaultValue="left"
                      options={[
                        { value: "left", label: "Left" },
                        { value: "center", label: "Center" },
                        { value: "right", label: "Right" },
                      ]}
                      style={{ width: 100 }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="Font Size" name="fontSize" initialValue={16}>
                    <Input
                      type="number"
                      min={10}
                      max={100}
                      placeholder="16"
                      style={{
                        backgroundColor: "#1a1a1a",
                        color: "#ffffff",
                        borderColor: "#333333",
                        width: 100,
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Form.Item
              label={<span style={{ color: "#ffffff" }}>Description</span>}
              name="description"
              rules={[
                { required: formType === "text", message: "Please input the description!" },
              ]}
              labelAlign="left"
            >
              <TextArea
                rows={4}
                style={{
                  backgroundColor: "#1a1a1a",
                  color: "#ffffff",
                  borderColor: "#333333",
                }}
              />
            </Form.Item>

            {(formType === "image" || formType === "imageText") && (
              <Form.Item
                label={<span style={{ color: "#ffffff" }}>Upload Image</span>}
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                labelAlign="left"
              >
                <Upload
                  listType="picture-card"
                  style={{
                    backgroundColor: "#1a1a1a",
                    color: "#ffffff",
                    borderColor: "#333333",
                  }}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8, color: "#ffffff" }}>Upload Image</div>
                  </div>
                </Upload>
              </Form.Item>
            )}

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                Save Changes
              </Button>
              <Button
                type="default"
                onClick={handleCancel}
                style={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default EditEvent;
