import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | Dashboad ', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    var controller = this.owner.lookup('controller:dashboard');
    assert.ok(controller);
  });
});
