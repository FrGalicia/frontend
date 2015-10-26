import {
  moduleForModel,
  test
} from 'ember-qunit';
import {a as testgroup} from 'ilios/tests/helpers/test-groups';
import modelList from '../../helpers/model-list';

moduleForModel('mesh-concept', 'Unit | Model | MeshConcept' + testgroup, {
  needs: modelList
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
