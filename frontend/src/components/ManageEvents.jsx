import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Input, message, ConfigProvider, theme } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch events and appointments data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await axios.get("http://95.177.217.236/api/events");
        const appointmentsResponse = await axios.get("http://95.177.217.236/api/appointments");
        setEvents(eventsResponse.data);
        setAppointments(appointmentsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Edit Button Click
  const handleEdit = (record, type) => {
    if (type === "appointment") {
      setEditingAppointment(record);
      setIsModalVisible(true);
    }
  };

  // Handle Delete
  const handleDelete = async (id, type) => {
    try {
      if (type === "event") {
        await axios.delete(`http://95.177.217.236/api/events/${id}`);
        setEvents(events.filter((event) => event.id !== id));
      } else {
        await axios.delete(`http://95.177.217.236/api/appointments/${id}`);
        setAppointments(appointments.filter((appointment) => appointment.id !== id));
      }
      message.success("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting:", error);
      message.error("Failed to delete!");
    }
  };

  // Handle Modal Submit for Editing Appointment
  const handleFormSubmit = async (values) => {
    try {
      if (editingAppointment) {
        // Update Appointment
        await axios.put(`http://95.177.217.236/api/appointments/${editingAppointment.id}`, values);
        setAppointments(
          appointments.map((appointment) =>
            appointment.id === editingAppointment.id ? { ...appointment, ...values } : appointment
          )
        );
      } else {
        // Add New Appointment
        await axios.post("http://95.177.217.236/api/appointments", values);
        setAppointments([...appointments, values]);
        message.success("Appointment added successfully!");
      }
      setIsModalVisible(false);
      setEditingAppointment(null);
    } catch (error) {
      console.error("Error updating or adding appointment:", error);
      message.error("Failed to update or add appointment!");
    }
  };

  // Handle Modal Cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingAppointment(null);
  };

  // Handle Add Event Button Click - Redirect to EditEvent Page
  const handleAddEvent = () => {
    navigate("/edit-events");
  };

  // Handle Back Button Click
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Table columns for Events
  const eventColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record, "event")}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id, "event")}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  // Table columns for Appointments
  const appointmentColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record, "appointment")}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id, "appointment")}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#141414",
          color: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <Button type="link" onClick={handleBack} style={{ color: "#ffffff", marginBottom: "20px" }}>
          Back
        </Button>

        <h2 style={{ color: "#ffffff" }}>Manage Events & Appointments</h2>

        <div style={{ marginBottom: "20px" }}>
          <Button type="primary" onClick={handleAddEvent} style={{ marginRight: "10px" }}>
            Add Event
          </Button>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            Add Appointment
          </Button>
        </div>

        <h3 style={{ color: "#ffffff" }}>Events</h3>
        <Table
          dataSource={events}
          columns={eventColumns}
          loading={loading}
          rowKey="id"
          style={{ marginBottom: "20px", backgroundColor: "#1f1f1f" }}
          pagination={{ pageSize: 5 }}
        />

        <h3 style={{ color: "#ffffff" }}>Appointments</h3>
        <Table
          dataSource={appointments}
          columns={appointmentColumns}
          loading={loading}
          rowKey="id"
          style={{ backgroundColor: "#1f1f1f" }}
          pagination={{ pageSize: 5 }}
        />

        {/* Edit Appointment Modal */}
        <Modal
          title="Edit Appointment"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          style={{ backgroundColor: "#1f1f1f", color: "#ffffff" }}
        >
          <Form initialValues={editingAppointment} onFinish={handleFormSubmit} layout="vertical">
            <Form.Item
              label={<span style={{ color: "#ffffff" }}>Title</span>}
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input
                style={{
                  backgroundColor: "#333333",
                  color: "#ffffff",
                  borderColor: "#555555",
                }}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: "#ffffff" }}>Time</span>}
              name="time"
              rules={[{ required: true, message: "Please input the time!" }]}
            >
              <Input
                style={{
                  backgroundColor: "#333333",
                  color: "#ffffff",
                  borderColor: "#555555",
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
}

export default ManageEvents;
