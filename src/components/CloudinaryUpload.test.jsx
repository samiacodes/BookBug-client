import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import CloudinaryUpload from './CloudinaryUpload';

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

// Mock the environment variables
jest.mock('import.meta.env', () => ({
  VITE_CLOUDINARY_CLOUD_NAME: 'test-cloud-name',
  VITE_CLOUDINARY_UPLOAD_PRESET: 'test-upload-preset'
}));

describe('CloudinaryUpload', () => {
  const mockOnUploadSuccess = jest.fn();
  const mockOnUploadError = jest.fn();
  const mockOnUploading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<CloudinaryUpload />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onUploadSuccess when file is uploaded successfully', async () => {
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        secure_url: 'https://example.com/uploaded-image.jpg'
      })
    });

    render(
      <CloudinaryUpload 
        onUploadSuccess={mockOnUploadSuccess}
        onUploadError={mockOnUploadError}
        onUploading={mockOnUploading}
      />
    );

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const input = screen.getByRole('button');
    
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnUploadSuccess).toHaveBeenCalledWith('https://example.com/uploaded-image.jpg');
      expect(toast.success).toHaveBeenCalledWith('Image uploaded successfully!');
    });
  });

  it('shows error message when file type is not an image', async () => {
    render(<CloudinaryUpload onUploadError={mockOnUploadError} />);

    const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
    const input = screen.getByRole('button');
    
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please select an image file');
      expect(mockOnUploadError).toHaveBeenCalledWith('Please select an image file');
    });
  });

  it('shows error message when file size exceeds limit', async () => {
    render(<CloudinaryUpload onUploadError={mockOnUploadError} />);

    // Create a file larger than 5MB
    const content = new ArrayBuffer(6 * 1024 * 1024); // 6MB
    const file = new File([content], 'large-image.png', { type: 'image/png' });
    const input = screen.getByRole('button');
    
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('File size exceeds 5MB limit');
      expect(mockOnUploadError).toHaveBeenCalledWith('File size exceeds 5MB limit');
    });
  });

  it('shows error message when upload fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({
        error: { message: 'Upload failed' }
      })
    });

    render(
      <CloudinaryUpload 
        onUploadSuccess={mockOnUploadSuccess}
        onUploadError={mockOnUploadError}
        onUploading={mockOnUploading}
      />
    );

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const input = screen.getByRole('button');
    
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Upload failed');
      expect(mockOnUploadError).toHaveBeenCalledWith('Upload failed');
    });
  });
});