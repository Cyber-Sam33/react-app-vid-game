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
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    // hard coded but would usually be received from form
    const newUser = { id: 0, name: "Sam" };
    setUsers([...users, newUser]);

    userService
      .create(newUser)
      //destructure the response object to grab 'data' and give it the alias 'savedUser'
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
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
