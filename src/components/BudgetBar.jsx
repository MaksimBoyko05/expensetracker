import {useState, useEffect} from "react";
import styles from "../styles/budgetbar.module.scss"

function BudgetBar({totalExpense}) {
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("budget")
    if (savedBudget) {
      return JSON.parse(savedBudget)
    } else {
      return 0;
    }
  })
  const [open, setOpen] = useState(false)
  useEffect(() => {
    try {
      localStorage.setItem("budget", JSON.stringify(budget))
    } catch (error) {
      console.log("Error with get data", error)
    }
  }, [budget]);
  const budgetLeft = Number(budget) - totalExpense;
  return (
    <>
      <div className={styles.maincontainer}>
        <h4>Вказаний бюджет: {budget}</h4>
        <div className={styles.valuesection}><span>Залишилось:{budgetLeft}</span>
          <span>Витрачено: {totalExpense}</span></div>
        <progress
          className={styles.budgetbar}
          max={budget}
          value={budgetLeft}></progress>
        <button onClick={() => setOpen(true)}>Ввести бюджет</button>
        {open && (
          <>
            <input
              type={"number"}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}/>
            <button onClick={() => setOpen(false)}>Зберегти</button>
          </>
        )}
      </div>
    </>
  );
}

export default BudgetBar;