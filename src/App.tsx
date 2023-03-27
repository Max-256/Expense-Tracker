import Form from "./components/Form/Form";
import Table from "./components/Table/Table";
import "bootstrap/dist/css/bootstrap.css";
import { FieldValues } from "react-hook-form";
import { useState } from "react";

type Items = {
  description: string;
  amount: number;
  category: string;
};

const App = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [selected, setSelected] = useState("");

  const onSubmit = (data: FieldValues) => {
    const newItems = [...items];
    newItems.push({
      description: data.description,
      amount: data.amount,
      category: data.category,
    });

    setItems(newItems);
  };

  const handleDelete = (item: Items) => {
    const newItems = items.filter((itm) => itm !== item);
    setItems(newItems);
  };

  const visibleItems = selected
    ? items.filter((item) => selected === item.category)
    : items;

  return (
    <>
      <Form onSubmit={onSubmit} />
      <Table
        items={visibleItems}
        onDelete={handleDelete}
        onSelect={(category: string) => setSelected(category)}
      />
    </>
  );
};

export default App;
