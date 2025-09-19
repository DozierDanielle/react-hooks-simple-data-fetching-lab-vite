import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  global.fetch = vi.fn();
});

describe('React Simple Data Fetching Lab', () => {
  it('renders the loading message initially', () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('fetches and displays a dog image after loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg' })
    });

    render(<App />);
    const image = await screen.findByRole('img');
    expect(image).toHaveAttribute('src', expect.stringContaining('dog.ceo'));
  });

  it('fetches a new dog image when the button is clicked', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_5221.jpg' })
      });

    render(<App />);
    const button = await screen.findByRole('button', { name: /new dog/i });
    fireEvent.click(button);

    const newImage = await screen.findByRole('img');
    expect(newImage).toHaveAttribute('src', expect.stringContaining('dog.ceo'));
  });
});
