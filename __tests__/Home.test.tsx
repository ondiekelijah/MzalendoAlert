import { render } from '@testing-library/react';
import Home from "../src/app/page";

describe("MzalendoAlert", () => {
  it("renders without crashing", () => {
    const { getByText, getByRole } = render(<Home />);

    expect(
      getByText("Help Families Reunite: Report a Missing Mzalendo.")
    ).toBeInTheDocument();
    expect(
      getByRole("button", { name: "Report Missing Mzalendo" })
    ).toBeInTheDocument();
  });
});
