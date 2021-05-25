import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import JobList from '../components/JobList'

test('renders link to jobs', () => {
  render (<JobList/>);
  const jobLink = screen.getByText(/job/i);
  expect(jobLink).toBeInTheDocument();
})