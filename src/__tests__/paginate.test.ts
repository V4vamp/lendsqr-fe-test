import { paginate } from "@/utils/paginate";

describe("paginate utility", () => {
  const data = [1, 2, 3, 4, 5];

  it("returns correct page data (positive)", () => {
    const result = paginate(data, 1, 2);
    expect(result).toEqual([1, 2]);
  });

  it("returns empty array for out-of-range page (negative)", () => {
    const result = paginate(data, 10, 2);
    expect(result).toEqual([]);
  });

  it("handles empty dataset (negative)", () => {
    const result = paginate([], 1, 5);
    expect(result).toEqual([]);
  });
});
