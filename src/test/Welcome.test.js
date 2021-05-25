import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import Welcome from '../components/Welcome'

test('renders link to jobs', () => {
  render (<Welcome/>);
  const jobLink = screen.getByText(/job/i);
  expect(jobLink).toBeInTheDocument();
})