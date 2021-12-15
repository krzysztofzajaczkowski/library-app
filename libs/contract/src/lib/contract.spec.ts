import { contract } from './contract';
import { expect } from 'chai'
describe('contract', () => {
  it('should work', () => {
    expect(contract()).eq('contract');
  });
});
