/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { IngredientsList } from './IngredientsList'
import { SearchForm } from './SearchForm'

export const IngredientsPage = () => {

  return (
    <React.Fragment>
      <SearchForm />
      <IngredientsList />
    </React.Fragment>
  );
}
