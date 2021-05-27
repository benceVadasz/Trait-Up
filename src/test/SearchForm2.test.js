import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import SearchForm2  from '../components/SearchForm2'

test('unique jobs are really unique', () => {
  const sF = render (<SearchForm2/>);
  expect(sF).toHaveBeenCalledWith('location', [])
})