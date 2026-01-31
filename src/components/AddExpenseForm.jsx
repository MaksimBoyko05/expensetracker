import {useState} from "react";

function AddExpenseForm({expenses, setExpenses, categories}) {

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
      category: data.category === "custom"
        ? data.customCategory
        : data.category
    }
    if (data.name && data.price && newExpense.category) {
      setExpenses([
        ...expenses, newExpense
      ])
      setData(initialState)
    } else {
      alert("Будь ласка, заповніть всі поля!")
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type={"text"}
            value={data.name}
            onChange={(e) => setData({...data, name: e.target.value})}/>
          <input
            type={"text"}
            value={data.price}
            onChange={(e) => setData({...data, price: e.target.value})}/>
          <select
            value={data.category}
            onChange={(e) => setData({...data, category: e.target.value})}>
            {categories.map(ctg => (
              <option key={ctg}>{ctg}</option>
            ))}
            <option value={"custom"}>+ Створити нову</option>
          </select>
          {data.category === "custom" && (
            <>
              <input
                type={"text"}
                value={data.customCategory}
                onChange={(e) => setData({...data, customCategory: e.target.value})}/>
            </>
          )}
          <button type="submit">Додати витрату</button>
        </form>
      </div>
    </>
  );
}

export default AddExpenseForm;