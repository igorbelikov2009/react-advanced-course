import { Button, Layout, Modal, Row } from "antd";
import React, { FC, useEffect, useState } from "react";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { useAction } from "../hooks/useAction";
import { useAppSelector } from "../hooks/useAppSelector";

const Event: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean | undefined>(false);

  const { fetchGuests } = useAction();
  const { guests } = useAppSelector((state) => state.event);

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <Layout className="mt-6">
      <EventCalendar events={[]} />
      <Row justify={"center"}>
        <Button onClick={() => setModalOpen(true)}> Добавить событие</Button>
      </Row>
      <Modal title="Добавить событие" open={modalOpen} footer={null} onCancel={() => setModalOpen(false)}>
        <EventForm guests={guests} />
      </Modal>
    </Layout>
  );
};

export default Event;
