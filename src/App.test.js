```javascript
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders School ERP", () => {
  render(<App />);
  const text = screen.getByText(/School ERP/i);
  expect(text).toBeInTheDocument();
});
```