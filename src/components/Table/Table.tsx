import styles from "./Table.module.css";

type Items = {
  description: string;
  amount: number;
  category: string;
};
interface Props {
  items: Items[];
  onDelete: (item: Items) => void;
  onSelect: (category: string) => void;
}

const Table = ({ items, onDelete, onSelect }: Props) => {
  let totalPrice = 0;
  for (let item of items) totalPrice += item.amount;

  return (
    <div className={styles.table}>
      <div className="input-group mb-5">
        <select
          onChange={(e) => onSelect(e.target.value)}
          className="form-select"
          id="category"
        >
          <option value="">All Categories</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Descripton</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>${item.amount}</td>
              <td>{item.category}</td>
              <td className={styles.btnContainer}>
                <button onClick={() => onDelete(item)} className={styles.btn}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>Total:</td>
            <td>${totalPrice}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
