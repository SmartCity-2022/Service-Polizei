import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {accident, getAllAccidents} from "./API/Meldungen";

test('renders learn react link', async() => {

  const accidents:accident[] | null = await getAllAccidents();
  expect(accidents).toBe(!null);
});
