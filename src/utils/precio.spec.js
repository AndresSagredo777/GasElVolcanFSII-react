import { formatearPrecio } from './precio';

describe('formatearPrecio', () => {
  it('muestra cero como Gratis', () => {
    expect(formatearPrecio(0)).toBe('Gratis');
  });

  it('formatea un valor positivo con separador de miles', () => {
    expect(formatearPrecio(12000)).toContain('12.000');
  });

  it('antepone el símbolo $', () => {
    expect(formatearPrecio(990).startsWith('$')).toBe(true);
  });
});
