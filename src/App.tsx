import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Form from "./components/Form";
import { useState } from "react";
import ExpenseList from "./expense-tracker/components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "aaa",
      amount: 10,
      category: "Utilities",
    },
    {
      id: 2,
      description: "bbb",
      amount: 20,
      category: "Utilities",
    },
    {
      id: 3,
      description: "ccc",
      amount: 10,
      category: "Utilities",
    },
    {
      id: 4,
      description: "ddd",
      amount: 10,
      category: "Utilities",
    },
  ]);
  // let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // };
  // const [alertVisble, setAlertVisibility] = useState(false);
  return (
    <div>
      <ExpenseList
        expenses={expenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
      {/* <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      /> */}
      {/* {alertVisble && (
        <Alert onClose={() => setAlertVisibility(false)}>Hey there!</Alert>
      )}
      <Button colour="primary" onClick={() => setAlertVisibility(true)}>
        My Button
      </Button> */}
      {/* <Form /> */}
    </div>
  );
}

export default App;
