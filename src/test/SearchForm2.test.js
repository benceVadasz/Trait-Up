import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import LocationTypeFilter  from '../components/LocationTypeFilter'

test('unique jobs are really unique', () => {
  const sF = render (<LocationTypeFilter/>);
  expect(sF).toHaveBeenCalledWith('location', [])
})