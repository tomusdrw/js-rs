/* eslint-env node,mocha */

import { expect } from 'chai';

describe('Test', () => {
  it('should work', () => {
    // given
    const a = 5;
    const b = 10;

    // when
    const c = a * b;

    // then
    expect(c).to.equal(50);
  });
});
