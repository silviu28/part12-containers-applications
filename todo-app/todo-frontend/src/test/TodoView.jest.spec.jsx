import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest';
import '@testing-library/jest-dom'
import Todo from "../Todos/Todo";

describe('<TodoView />', () => {
  it('Displays the to-do information correctly', () => {
    const onClickComplete = () => {}
    const onClickDelete = () => {}
    const todo = {
      text: 'Complete this test',
      complete: false,
    }

    render(
      <Todo
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
        todo={todo}
      />
    )

    expect(screen.getByText('Complete this test')).toBeVisible()
  })
});