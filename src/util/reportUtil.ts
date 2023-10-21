import { Order } from "../redux/features/report/reportSlice";

export function buildReport(payload: Order[]) {
  const combinationsCount: { [key: string]: number } = {};

  payload.forEach((order) => {
    const toppings = order.toppings.join(", ");
    combinationsCount[toppings] = (combinationsCount[toppings] || 0) + 1;
  });

  const sortedCombinations = Object.keys(combinationsCount).sort(
    (a, b) => combinationsCount[b] - combinationsCount[a]
  );

  const top20Combinations = sortedCombinations.slice(0, 20);

  const reportData: Order[] = top20Combinations.map((combination) => ({
    toppings: combination.split(", "),
    count: combinationsCount[combination],
    rank: top20Combinations.indexOf(combination) + 1,
  }));

  console.log(reportData);
  return reportData;
}
