import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import categories from "./expense-tracker/categories";
import ProductList from "./components/ProductList";
import axios from "axios";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// function App() {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [expenses, setExpenses] = useState([
//     {
//       id: 1,
//       description: "aaa",
//       amount: 10,
//       category: "Utilities",
//     },
//     {
//       id: 2,
//       description: "bbb",
//       amount: 20,
//       category: "Utilities",
//     },
//     {
//       id: 3,
//       description: "ccc",
//       amount: 10,
//       category: "Utilities",
//     },
//     {
//       id: 4,
//       description: "ddd",
//       amount: 10,
//       category: "Utilities",
//     },
//   ]);
//   // let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
//   // const handleSelectItem = (item: string) => {
//   //   console.log(item);
//   // };
//   // const [alertVisble, setAlertVisibility] = useState(false);

//   const visibleExpenses = selectedCategory
//     ? expenses.filter((e) => e.category === selectedCategory)
//     : expenses;
//   return (
//     <div>
//       <div className="mb-5">
//         <ExpenseForm
//           onSubmit={(newExpense) =>
//             setExpenses([
//               ...expenses,
//               { ...newExpense, id: expenses.length + 1 },
//             ])
//           }
//         />
//       </div>
//       <div className="mb-3">
//         <ExpenseFilter
//           onSelectCategory={(category) => setSelectedCategory(category)}
//         />
//       </div>
//       <ExpenseList
//         expenses={visibleExpenses}
//         onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
//       />
//       {/* <ListGroup
//         items={items}
//         heading="Cities"
//         onSelectItem={handleSelectItem}
//       /> */}
//       {/* {alertVisble && (
//         <Alert onClose={() => setAlertVisibility(false)}>Hey there!</Alert>
//       )}
//       <Button colour="primary" onClick={() => setAlertVisibility(true)}>
//         My Button
//       </Button> */}
//       {/* <Form /> */}
//     </div>
//   );
// }

// function App() {
//   const [category, setCategory] = useState("");
//   return (
//     <div>
//       <select
//         className="form-select"
//         onChange={(event) => setCategory(event.target.value)}
//       >
//         <option value=""></option>
//         <option value="Clothing">Clothing</option>
//         <option value="Household">Household</option>
//       </select>
//       <ProductList category={category} />
//     </div>
//   );
// }
