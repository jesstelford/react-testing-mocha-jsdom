import React from 'react/addons';
import assert from 'assert';
import expectJSX from 'expect-jsx';
import expect from 'expect';
import TodoItem from '../../common/components/todo-item';

import {createRenderer, renderIntoDocument, findRenderedDOMComponentWithTag} from 'react-addons-test-utils';

expect.extend(expectJSX);

describe('Todo-item component', function(){
  it('<input> should not be checked - using expect-jsx', () => {
    let renderer = createRenderer();
    renderer.render(<TodoItem done={false} name="Write Tutorial"/>);
    let actualElement = renderer.getRenderOutput();

    const expectedElement = <label>
      <input ref="done"
        defaultChecked={false}
        onChange={()=>{}}
        type="checkbox"/>
      Write Tutorial
    </label>;
    expect(actualElement).toEqualJSX(expectedElement);
  });
});