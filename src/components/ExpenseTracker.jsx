import {useState, useEffect} from "react";
import Form from "./AddExpenseForm";

function ExpenseTracker (){
  const initialExpenses = [
    { id: 1, name: "Кава", price: 65, category: "Їжа", date: "2024-01-28" },
    { id: 2, name: "Книга React", price: 450, category: "Навчання", date: "2024-01-25" },
    { id: 3, name: "Кіно", price: 180, category: "Розваги", date: "2024-01-20" },
    { id: 4, name: "Продукти", price: 1200, category: "Їжа", date: "2024-01-29" },
    { id: 5, name: "Таксі", price: 150, category: "Транспорт", date: "2024-01-29" },
  ];
  const [expenses, setExpenses] = useState(initialExpenses)
  const [selectedCategory, setSelectedCategory] = useState("Їжа")

  const sortExpenses = () => {
    let newExpenses = [...expenses]
      setExpenses(newExpenses.sort((a, b) => a.price - b.price))
  }

  const filteredExpenses = selectedCategory === "All"
  ? expenses
    : expenses.filter(item =>  item.category === selectedCategory)

  const categories = ["All", ...new Set(expenses.map(exp =>(exp.category)))]
  const totalExpense = filteredExpenses.reduce((accumulator, currentValue) =>{
    return accumulator +  currentValue.price
  }, 0);
  return (
    <>
      <div>
       <ul>
         {filteredExpenses.map(exp =>(
           <li key={exp.id}>{exp.name} - {exp.price} грн</li>
         ))}
       </ul>
        <p>Усього: {totalExpense}</p>
        <button onClick={sortExpenses}>Сортувати</button>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map(ctg =>  (
            <option key={ctg}>{ctg}</option>
          ))}
        </select>
        <Form expenses={expenses} setExpenses={setExpenses} categories={categories}/>
      </div>
    </>
  );
}
export default  ExpenseTracker;