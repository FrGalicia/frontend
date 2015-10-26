import {
  moduleForModel,
  test
} from 'ember-qunit';
import {a as testgroup} from 'ilios/tests/helpers/test-groups';
import modelList from '../../helpers/model-list';

moduleForModel('user-role', 'Unit | Model | UserRole' + testgroup, {
  needs: modelList
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
