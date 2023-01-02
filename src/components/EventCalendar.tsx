import { Calendar } from "antd";
import { Moment } from "moment";
import React, { FC } from "react";
import { IEvent } from "../models/IEvent";
import { formatDate } from "../utils/date";

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
  function dateCellRender(value: Moment) {
    // нашу дату преобразовываем к типу date
    const formatedDate = formatDate(value.toDate());
    // Пробегаемся по нашему массиву с обытиями, нам необходимо убедиться в том, что там есть
    // объект с такой датой. На одну дату у нас может быть несколько событий и нам надо получить
    // массив событий на эту дату, чтобы отрисовать сразу все.
    const currentDayEvents = props.events.filter((ev) => ev.date === formatedDate);

    return (
      <div>
        {currentDayEvents.map((ev, index) => (
          <div key={index}>{ev.description}</div>
        ))}
      </div>
    );
  }

  return <Calendar dateCellRender={dateCellRender} />;
};

export default EventCalendar;
