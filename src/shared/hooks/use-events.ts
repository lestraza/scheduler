import { BASE_URL } from "../constants/env";
import { UserEvent } from "../types";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=UTF-8",
};

export const useEvents = () => {
  const getAllEvents = async () => {
    await fetch(BASE_URL + "get_all_events", {
      method: "GET",
      headers,
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data.data);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveEvent = async (event: UserEvent) => {
    await fetch(BASE_URL + "save_event", {
      method: "POST",
      headers,
      body: JSON.stringify(event),
    })
      .then((res) => {
          if (res.ok) {
            return true
        //   res.json().then((data) => {
        //     return data.data;
        //   });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { getAllEvents, saveEvent };
};
