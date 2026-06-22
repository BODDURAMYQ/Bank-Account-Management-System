import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <>{children}</>,
  Routes: ({ children }) => <>{children}</>,
  Route: ({ element }) => element,
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  Navigate: ({ to }) => <div data-testid="navigate" data-to={to} />,
  useLocation: () => ({ state: null }),
  useNavigate: () => jest.fn(),
}), { virtual: true });

test('renders bank management home page', () => {
  render(<App />);
  expect(screen.getByText(/Welcome to Bank Account Management System/i)).toBeInTheDocument();
});
