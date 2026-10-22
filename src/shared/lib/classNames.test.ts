import { classNames } from './classNames';

describe('classNames', () => {
  it('возвращает строку из одного класса', () => {
    expect(classNames('btn')).toBe('btn');
  });

  it('объединяет несколько классов', () => {
    expect(classNames('btn', 'btn--primary')).toBe('btn btn--primary');
  });

  it('игнорирует falsy значения', () => {
    expect(classNames('btn', null, undefined, false, '')).toBe('btn');
  });

  it('обрабатывает объект с условиями', () => {
    expect(
      classNames('btn', { 'btn--active': true, 'btn--disabled': false })
    ).toBe('btn btn--active');
  });

  it('возвращает пустую строку, если аргументов нет', () => {
    expect(classNames()).toBe('');
  });

  it('обрабатывает number', () => {
    expect(classNames('btn', 42)).toBe('btn 42');
  });

  it('обрезает пробелы в строках', () => {
    expect(classNames('  btn  ')).toBe('btn');
  });
});
