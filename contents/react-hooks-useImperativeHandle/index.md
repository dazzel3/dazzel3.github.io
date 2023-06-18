---
date: '2023-06-18'
title: 'useImperativeHandle이란?'
categories: { type: ['React'], tags: ['React Docs'] }
summary: 'React Hook 중 useImperativeHandle에 대해 알아보자.'
thumbnail: './react.png'
---

## useImperativeHandle

`ref`로 노출된 핸들을 사용자 정의할 수 있는 React Hook이다.

```jsx
import { forwardRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  useImperativeHandle(ref, () => {
    return {
      // createHandle methods
    };
  }, []); // optional dependencies

```

### 파라미터

- `ref`
  - 렌더링 함수 `forwardRef`에서 두 번째 매개 변수로 받은 `ref`이다.
- `createHandle`
  - 매개 변수 없이 노출하고 싶은 `ref` 핸들을 `return` 하는 함수이다.
- optional `dependencies`
  - `createHandle` 함수 내에 반응형 값을 사용했다면, 해당 반응형 값이 포함된 배열이다.

<br>

## Usage

### Exposing a custom ref handle to the parent component

기본적으로 컴포넌트는 상위 컴포넌트에게 DOM 노드를 노출하지 않는다. 예를 들어, `MyInput`의 상위 컴포넌트가 `<input>` DOM 노드에 접근할 수 있도록 하려면 `forwardRef`로 허용시켜주어야 한다.

```jsx
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  return <input {...props} ref={ref} />;
});
```

위 코드에서 `MyInput`의 `ref`는 `<input>` DOM 노드를 받을 것이다. 하지만 사용자 지정 값을 노출할 수 있다. 노출된 핸들을 사용자 지정하고 싶으면 아래와 같이 코드를 작성하면 된다.

```jsx
import { forwardRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  useImperativeHandle(
    ref,
    () => {
      return {
        // ... your methods ...
      };
    },
    [],
  );

  return <input {...props} />;
});
```

위 코드에서는 `ref`에 `<input>`이 전달되지 않는다. 예를 들어, 전체 `<input>` DOM 노드를 노출하지 않고 `focus`나 `scrollIntoView` 함수를 노출하고 싶다고 가정해보자. 이렇게 하기 위해서는 실제 브라우저 DOM을 별도의 ref에 보관한 다음 `useImperativeHandle`을 사용하여 부모 컴포넌트에서 호출하려는 메서드만 있는 핸들을 노출하면 된다.

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          inputRef.current.focus();
        },
        scrollIntoView() {
          inputRef.current.scrollIntoView();
        },
      };
    },
    [],
  );

  return <input {...props} ref={inputRef} />;
});
```

이제 상위 컴포넌트가 `MyInput`에서 `ref`를 가져오면 `focus`랑 `scrollIntoView`를 호출할 수 있다. 하지만 `<input>` DOM 노드에 대한 완전한 접근은 할 수 없다.

<br>

<aside>
😵 <strong>주의</strong> <br>
props으로 표현할 수 없는 imperative한 행동을 위해서만 ref를 사용해야 한다. 그리고, 만약 prop으로 표현할 수 있다면 ref를 사용하면 안된다.
</aside>

<br>

### References

- [react/useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)

<br>
