import {useState, useEffect} from "react";
import {Pencil} from 'lucide-react';
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
        <h4>Вказаний бюджет:
          {open ? (
            <>
              <input
                className={styles.editinput}
                type={"number"}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}/>
              <button
                className={styles.savebtn}
                onClick={() => setOpen(false)}>Зберегти
              </button>
            </>
          ) : (
            <>
              <span>{budget}</span>
              <button
                className={styles.editbtn}
                onClick={() => setOpen(true)}><Pencil size={16}/></button>
            </>
          )}
        </h4>
        <div className={styles.valuesection}>
          <span className={styles.spanleft}>Залишилось:{budgetLeft < 0 ? 0 : budgetLeft}</span>
          <span className={styles.spendspan}>Витрачено: {totalExpense}</span>
        </div>
        <progress
          className={styles.budgetbar}
          max={budget}
          value={budgetLeft}></progress>
      </div>
    </>
  );
}

export default BudgetBar;