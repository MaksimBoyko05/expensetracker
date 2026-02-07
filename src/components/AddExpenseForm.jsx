import {useState} from "react";
import { X } from 'lucide-react';
import styles from '../styles/modal.module.scss'

function AddExpenseForm({expenses, setExpenses, categories, onClose}) {

  const initialState = {
    name: "",
    price: "",
    category: "",
    customCategory: "",
  }
  const [data, setData] = useState(initialState)

  const handleSubmit = (e) => {
    e.preventDefault()

    const newExpense = {
      ...data,
      id: Date.now().toString(36),
      date:new Date().toLocaleDateString('uk-UA'),
      category: data.category === "custom"
        ? data.customCategory.trim()
        : data.category.trim()
    }
    if (data.name && data.price && newExpense.category) {
      setExpenses([
        ...expenses, newExpense
      ])
      setData(initialState)
      onClose(false)
    } else {
      alert("Будь ласка, заповніть всі поля!")
    }
  }
  const handleClose = () => {
    onClose(false)
    setData(initialState)
  }

  return (
    <>
      <div className={styles.modalwrapper}>
        <div className={styles.modalcontent}>
          <button onClick={handleClose} className={styles.closebtn}> <X size={20}/></button>
        <form onSubmit={handleSubmit}>
          <div className={styles.pricesection}>
            <label>Назва витрати:</label>
            <input
              type={"text"}
              placeholder={"Назва"}
              value={data.name}
              onChange={(e) => setData({...data, name: e.target.value})}
            />
          </div>
          <div className={styles.secondsection}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Cума</label>
                <input
                  type={"number"}
                  placeholder={"0.00"}
                  value={data.price}
                  onChange={(e) => setData({...data, price: e.target.value})}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Категорія</label>
                <select
                  value={data.category}
                  onChange={(e) => setData({...data, category: e.target.value})}>
                  {categories.map(ctg => (
                    <option key={ctg}>{ctg}</option>
                  ))}
                  <option value={"custom"}>+ Створити нову</option>
                </select>
              </div>

            </div>
            {data.category === "custom" && (
              <div className={styles.customInput}>
                <label>Введіть назву категорії</label>
                <input
                  type={"text"}
                  placeholder="Наприклад: Спорт"
                  value={data.customCategory}
                  onChange={(e) => setData({...data, customCategory: e.target.value})}/>
              </div>
            )}

          </div>
          <div className={styles.btnblock}>
            <button className={styles.cancelbtn} onClick={handleClose}>Скасувати</button>
            <button className={styles.addbtn} type="submit">Додати витрату</button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
}

export default AddExpenseForm;