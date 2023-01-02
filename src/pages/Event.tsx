import { Button, Layout, Modal, Row } from "antd";
import React, { FC, useEffect, useState } from "react";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { useAction } from "../hooks/useAction";
import { useAppSelector } from "../hooks/useAppSelector";
import { IEvent } from "../models/IEvent";

const Event: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean | undefined>(false);

  const { fetchGuests, createEvent, fetchEvents } = useAction();
  const { guests, events } = useAppSelector((state) => state.event);

  // достаём пользователя, нам нужен его username
  const { user } = useAppSelector((state) => state.auth);
  // console.log(user.username);

  const addNewEvent = (event: IEvent) => {
    setModalOpen(false);
    createEvent(event);
  };

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout className="mt-6">
      {/* {JSON.stringify(events)} */}
      <EventCalendar events={events} />
      <Row justify={"center"}>
        <Button onClick={() => setModalOpen(true)}> Добавить событие</Button>
      </Row>
      <Modal title="Добавить событие" open={modalOpen} footer={null} onCancel={() => setModalOpen(false)}>
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Event;
