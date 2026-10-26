import { render, screen } from '@testing-library/react';
import { Select } from './Select';

const OPTIONS = [
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' }
];

describe('Select', () => {
  it('рендерит размер medium по умолчанию', () => {
    render(
      <Select
        options={OPTIONS}
        value={null}
        onChange={() => {}}
        placeholder='Status'
      />
    );

    const select = screen.getByRole('button');
    expect(select).toHaveClass('select__button_medium');
  });

  it('рендерит размер small', () => {
    render(
      <Select
        options={OPTIONS}
        value={null}
        onChange={() => {}}
        size='small'
        placeholder='Status'
      />
    );

    const select = screen.getByRole('button');
    expect(select).toHaveClass('select__button_small');
  });

  it('отображает placeholder, если значение не выбрано', () => {
    render(
      <Select
        options={OPTIONS}
        value={null}
        onChange={() => {}}
        placeholder='Status'
      />
    );

    const placeholder = screen.getByText('Status');
    expect(placeholder).toBeInTheDocument();
  });
});
