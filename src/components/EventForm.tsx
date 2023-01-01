import { Button, DatePicker, Form, Input, Row, Select } from "antd";
// import { Dayjs } from "dayjs";
import { Moment } from "moment";
import React, { FC, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { IEvent } from "../models/IEvent";
import { IUser } from "../models/IUser";
import { formatDate } from "../utils/date";
import { rules } from "../utils/rules";

interface EventFormProps {
  guests: IUser[];
}

// мы не принимаем guests состоянием, а принимаем пропсами
// для того, чтобы эту форму можно было переиспользовать в
// другом месте приложения и у нас был другой список полльзователей.
const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({ author: "", date: "", description: "", guest: "" } as IEvent);
  const { user } = useAppSelector((state) => state.auth);

  const selectDate = (date: Moment | null) => {
    if (date) {
      // console.log(formatDate(date.toDate()));
      setEvent({ ...event, date: formatDate(date.toDate()) });
    }
  };

  const submitForm = () => {
    console.log(event);
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item label="Описание события" name="description" rules={[rules.required()]}>
        <Input onChange={(e) => setEvent({ ...event, description: e.target.value })} value={event.description} />
      </Form.Item>

      <Form.Item label="Дата события" name="date" rules={[rules.required()]}>
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>

      <Form.Item label="Выберите гостя" name="guest" rules={[rules.required()]}>
        {/* передаём старый event и заменяем в нём поле guest */}
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {props.guests.map((guest) => (
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Row justify={"end"}>
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
      </Row>
    </Form>
  );
};

export default EventForm;
