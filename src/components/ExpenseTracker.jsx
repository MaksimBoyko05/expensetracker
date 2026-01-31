import {useState, useEffect} from "react";
import Form from "./AddExpenseForm";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses")
    if (savedExpenses) {
      return JSON.parse(savedExpenses)
    } else {
      return []
    }
  })
  const [selectedCategory, setSelectedCategory] = useState("All")

  const sortExpenses = () => {
    let newExpenses = [...expenses]
    setExpenses(newExpenses.sort((a, b) => a.price - b.price))
  }

  const filteredExpenses = selectedCategory === "All"
    ? expenses
    : expenses.filter(item => item.category === selectedCategory)

  const categories = ["All", ...new Set(expenses?.map(exp => (exp.category)))]
  const totalExpense = filteredExpenses.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue.price)
  }, 0);
  useEffect(() => {
    try {
      localStorage.setItem("expenses", JSON.stringify(expenses))
    } catch (error) {
      console.log("Error with get data", error)
    }
  }, [expenses]);
  return (
    <>
      <div>
        {expenses.length === 0 ? (
          <p>У вас ще немає витрат</p>
        ) : (
          <ul>
            {filteredExpenses?.map(exp => (
              <li key={exp.id}>{exp.name} - {exp.price} грн</li>
            ))}
          </ul>
        )}
        <p>Усього: {totalExpense}</p>
        <button onClick={sortExpenses}>Сортувати</button>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map(ctg => (
            <option key={ctg}>{ctg}</option>
          ))}
        </select>
        <Form
          expenses={expenses}
          setExpenses={setExpenses}
          categories={categories}/>
      </div>
    </>
  );
}

export default ExpenseTracker;