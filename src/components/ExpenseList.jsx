import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";

export default function ExpenseList() {
  const { entries ,setEntries } = useEntries();
  const expenseEntries = entries.filter((entry) => entry.type === "expense");
  return (
    <div>
      <h2 className="border-b pb-2 font-medium text-red-600">Expense</h2>

      {expenseEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There are no expenses.</p>
      )}

      <ul id="expense-list" className="divide-y">
        {expenseEntries.map((item) => {
          return (
            <li key={item.id} className="py-2.5">
              <div className="group flex justify-between gap-2 text-sm">
                <span>{item.title}</span>
                <div>
                  <span className="text-red-600">
                    -{formatMoney(item.value)}
                  </span>
                  <span className="ml-2 hidden cursor-pointer font-medium text-black-500 group-hover:inline-block"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(entries);
                              console.log(item.id);
                              function getUserInput() {
                                const title = prompt("Enter Title:");
                                const value = prompt("Enter value:");
                                item.title = title;            
                                item.value = value;
                                setEntries([
                                  ...entries
                                ]);                                                     
                            }
                            getUserInput();
                            }}
                  >
                    Edit
                  </span>
                  <span className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("submitted");
                              console.log(entries);
                              console.log(item.id);
                              setEntries(entries.filter((entry) => entry.id !== item.id));
                              console.log(entries);
                            }}
                  >
                    Delete
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
