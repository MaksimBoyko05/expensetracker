import {useState, useEffect} from "react";
import Form from "./AddExpenseForm";
import BudgetBar from "./BudgetBar";
import styles from '../styles/main.module.scss'

function ExpenseTracker() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses")
    if (savedExpenses) {
      return JSON.parse(savedExpenses)
    } else {
      return []
    }
  })
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const sortExpenses = () => {
    let newExpenses = [...expenses]
    setExpenses(newExpenses.sort((a, b) => a.price - b.price))
  }

  const filteredExpenses = selectedCategory === "All"
    ? expenses
    : expenses.filter(item => item.category === selectedCategory)

  const categories = ["All", ...new Set(expenses?.map(exp => (exp.category)))]
  const totalExpense = expenses.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue.price)
  }, 0);
  const categoryExpense = filteredExpenses.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue.price)
  }, 0);

  useEffect(() => {
    try {
      localStorage.setItem("expenses", JSON.stringify(expenses))
    } catch (error) {
      console.log("Error with get data", error)
    }
  }, [expenses]);

  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash % 360);

    return {
      backgroundColor: `hsl(${h}, 70%, 90%)`,
      color: `hsl(${h}, 70%, 25%)`,
      border: `1px solid hsl(${h}, 70%, 80%)`
    };
  }
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  }

  return (
    <>
      <div className={styles.maincontainer}>
        <div>
          <BudgetBar totalExpense={totalExpense}/>
        </div>
        {expenses.length === 0 ? (
          <>
          <p>У вас ще немає витрат</p>
            <div className={styles.addexpense} onClick={()=> setOpen(true)}>+</div>
          </>
        ) : (
          <>
            <div className={styles.sortcontainer}>
              <button onClick={sortExpenses}>Сортувати</button>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map(ctg => (
                  <option key={ctg}>{ctg}</option>
                ))}
              </select>
            </div>
          <div className={styles.cardscontainer}>
            {filteredExpenses?.map(exp => (
              <>
              <div
                className={styles.expensecard}
                key={exp.id}>
                <div className={styles.topinfo}>
                  <span className={styles.expensename}>{exp.name} </span>
                  <span className={styles.expenseprice}>{exp.price} ₴</span>
                  <div className={styles.deletecontainer}>
                    <button
                      className={styles.deletebtn}
                      onClick={() => deleteExpense(exp.id)}>&times;</button>
                  </div>
                </div>
                <div className={styles.downinfo}>
                  <span className={styles.categorybadge} style={stringToColor(exp.category)}>{exp.category}</span>
                  <span className={styles.expensedate}>{exp.date}</span>
                </div>
              </div>
              </>
            ))}
            <div className={styles.addexpense} onClick={()=> setOpen(true)}>+</div>
          </div>
      </>
        )}
        {filteredExpenses !== "All" && (
          <>
          <p>У обраній категорії: {categoryExpense}</p>
          </>
        )
        }
        {open && (
          <>
            <Form
              expenses={expenses}
              setExpenses={setExpenses}
              categories={categories}
              onClose={setOpen}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ExpenseTracker;