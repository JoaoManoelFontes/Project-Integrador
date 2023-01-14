import { useEffect } from "react";

export default function Carrousel() {
  useEffect(() => {
    api
      .get()
      .then(({ data }) => {
        setCards(data.cards);
      })
      .catch((err) => {
        console.log(err.response.body);
      });
  });
}
