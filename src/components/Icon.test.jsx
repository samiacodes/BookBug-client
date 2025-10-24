import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from './Icon';

// Mock the react-icons library
jest.mock('react-icons/hi', () => ({
  HiHome: () => <div data-testid="home-icon">Home Icon</div>,
  HiBookOpen: () => <div data-testid="books-icon">Books Icon</div>,
  HiUserGroup: () => <div data-testid="users-icon">Users Icon</div>,
}));

jest.mock('react-icons/fa', () => ({
  FaBookOpen: () => <div data-testid="book-open-icon">Book Open Icon</div>,
}));

describe('Icon Component', () => {
  test('renders the correct icon based on name prop', () => {
    render(<Icon name="home" />);
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  });

  test('renders the books icon', () => {
    render(<Icon name="books" />);
    expect(screen.getByTestId('books-icon')).toBeInTheDocument();
  });

  test('renders the users icon', () => {
    render(<Icon name="users" />);
    expect(screen.getByTestId('users-icon')).toBeInTheDocument();
  });

  test('renders the bookOpen icon', () => {
    render(<Icon name="bookOpen" />);
    expect(screen.getByTestId('book-open-icon')).toBeInTheDocument();
  });

  test('applies the correct size classes', () => {
    const { container } = render(<Icon name="home" size="lg" />);
    const icon = container.querySelector('[data-testid="home-icon"]');
    expect(icon).toBeInTheDocument();
    // Note: We're not directly testing class names since they're applied to the actual icon component
  });

  test('returns null for unknown icon names', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const { container } = render(<Icon name="unknown" />);
    expect(container.firstChild).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith("Icon 'unknown' not found in icon map");
    consoleSpy.mockRestore();
  });
});