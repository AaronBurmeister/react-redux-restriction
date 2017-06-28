# react-redux-restriction

react-redux-restriction provides React components which allow redux dependent conditional rendering.

## Table of contents
 - [React, Redux](#react-redux)
 - [React Router](#react-router)
 - [Reselect](#reselect)
 - [Passing children](#passing-children)
 - [API](#api)
   - [\<Restriction\>](#restriction)
   - [\<RestrictionRoute\>](#restrictionroute)
   - [fetchComponent()](#fetchcomponent)

## React, Redux

This package provides mainly React components.
See [React](https://facebook.github.io/react/) for more details.

It also depends on [Redux](http://redux.js.org/docs/introduction/).

## React Router

You can use this package with React Router. The [Route](#restrictionroute) provides the bindings.

## Reselect

It is recommended to use [Reselect](https://github.com/reactjs/reselect) for the `condition` property.

You can use it like this:
```
import { createSelector } from 'reselect';

const state = { someData: { someOtherData: { a: undefined, b: 'value' } } };

const selectSomeData = state => state.someData;

const selectSomeOtherData = createSelector(
  selectSomeData,
  someData => someData.someOtherData
);

const selectIsASet = createSelector(
  selectSomeOtherData,
  someOtherData => !!someOtherData.a
);

<Restriction
  not
  condition={selectIsASet}
>
  This will be rendered
</Restriction>
```

## Passing children

Children can be passed using one of the following props:

* **component:ReactComponent**

  Creates a React node from the component with ownProps provided.
  This takes precendence over `render` and `children`.

* **render(ownProps):ReactNode**

  Should return a React node. The ownProps are passed as argument.
  This takes precendence over `children`.

* **children:ReactNode**

  Directly passed children.

See [fetchComponent](#fetchcomponent).

This structure is inspired from [React Router's render methods](https://reacttraining.com/react-router/web/api/Route/Route-render-methods).

## API

### \<Restriction\>

Only renders the underlying children if the condition is met.
It also can be used to alter the store based on a condition.

```jsx
import Restriction from 'react-redux-restriction';

<Restriction
  not={boolean}
  condition={(state, ownProps) => boolean}
  updateState={(dispatch, ownProps) => void}
  fixState={(dispatch, ownProps) => void}
  
  component={ReactComponent}
  render={(ownProps) => ReactNode}
  
  {...ownProps}
>
  {ReactNode}
</Restriction>
```

#### Properties

* **not:boolean**

  Specifies wether the condition should be falsy (if set to true) or not. In fact this reverts the result of `condition`.

* **condition(state, ownProps):boolean**

  Checks the state and returns true if the condition is met.
  - Function parameters
     - state: the current redux state
     - ownProps: the components props beside Restriction specific ones

* **updateState(dispatch, ownProps):void**

  Gets called before the component gets rendered to alter the store if the condition meets the requirements.
  - Function parameters
    - dispatch: the store's dispatch function
    - ownProps: the components props beside Restriction specific ones

* **fixState(dispatch, ownProps):void**

  Gets called before the component gets rendered to alter the store if the condition doesn't meet the requirements.
  - Function parameters
    - dispatch: the store's dispatch function
    - ownProps: the components props beside Restriction specific ones

* **component:ReactComponent, render(ownProps):ReactNode, children:ReactNode**

  See [Passing children](#passing-children)

### \<RestrictionRoute\>

Wrapps a [Route](https://github.com/ReactTraining/react-router) into [Restrictions](#restriction) in order to create state dependent conditional routes.

```jsx
// Either
import { RestrictionRoute } from 'react-redux-restriction';
// Or
import Restriction from 'react-redux-restriction';
const RestrictionRoute = Restriction.Route;

<RestrictionRoute
  conditions={[
    {
      not,
      condition,
      updateState,
      fixState,
      ...ownProps
    },
    ...
  ]}
  
  component={ReactComponent}
  render={(ownProps) => ReactComponent}
  
  {...ownProps}
>
  {ReactNode}
</RestrictionRoute>
```

#### Properties

* **conditions:array**

  The conditions to be met. Each condition is mapped to a `Restriction`. They are handled in the order in which they are provided.
  See [Restriction](#restriction) to get further information on which props to pass to the `Restrictions` in particular.
  Note that you can also pass custom properties to the individual `Restrictions`. The `ownProps` provided directly to the RestrictionRoute also get passed to the individual `Restrictions` but get overwritten if also set for the specific condition.

* **component:ReactComponent, render(ownProps):ReactNode, children:ReactNode**

  See [Passing children](#passing-children)

### fetchComponent()

Takes render methods and returns a React node.
It is internally used by [Restriction](#restriction).

```JavaScript
ReactNode = fetchComponent(
  {
    component: ReactComponent,
    render: (ownProps) => ReactNode,
    children: ReactNode
  },
  props,
  defaultValue = null
);
```

### Function parameters

* **Render methods**

  Contains one of the render methods.
  See [Passing children](#passing-children) for more information.

* **Props**

  The props which should be passed to the node if supported. This doesn't work with the `children` prop.

* **Default value**

  The value which should be returned if none of the supported render methods was supplied.
  This is set to `null` by default.

### Return value

Returns a `ReactNode` from the provided render method or `Default value` if no supported render method was supplied.
