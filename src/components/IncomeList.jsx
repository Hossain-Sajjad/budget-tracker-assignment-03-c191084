import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";

export default function IncomeList() {
  const { entries, setEntries } = useEntries();
  const incomeEntries = entries.filter((entry) => entry.type === "income");

  return (
    <div>
      <h2 className="border-b pb-2 font-medium text-green-600">Income</h2>
      {incomeEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There are no expenses.</p>
      )}

      <ul id="income-list" className="divide-y">
        {incomeEntries.map((income) => {
          return (
            <li key={income.id} className="py-2.5">
              <div className="group flex justify-between gap-2 text-sm">
                <span>{income.title}</span>

                <div>
                  <span className="text-green-600">
                    {formatMoney(income.value)}
                  </span>
                  <span className="ml-2 hidden cursor-pointer font-medium text-black-500 group-hover:inline-block"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(entries);
                              console.log(income.id);
                              function getUserInput() {
                                const title = prompt("Enter Title:");
                                const value = prompt("Enter value:");
                                income.title = title;            
                                income.value = parseFloat(value);
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
                              console.log(income.id);
                              setEntries(entries.filter((entry) => entry.id !== income.id));
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
