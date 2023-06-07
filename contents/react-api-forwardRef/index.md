---
date: '2023-06-03'
title: 'forwardRef란?'
categories: { type: ['React'], tags: ['React Docs'] }
summary: 'React API 중 forwardRef에 대해 알아보자.'
thumbnail: './react.png'
---

### forwardRef

컴포넌트가 상위 컴포넌트에서 DOM 노드를 `ref`로 접근할 수 있게 해준다.

`forwardRef`는 컴포넌트가 `ref`를 받아서 자식 컴포넌트에게 전달할 때 호출하면 된다. 아래와 같이 컴포넌트를 감싸서 사용할 수 있다.

```jsx
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  // ...
});
```

### 파라미터

- `render`
  컴포넌트를 렌더 함수로 받는다. 리액트는 컴포넌트가 부모로부터 받은 `props`와 `ref`를 받아온다. return 하는 JSX가 이 렌더 함수의 output이 된다.

### Returns

JSX에서 렌더할 수 있는 컴포넌트를 반환한다. 일반적인 함수로 정의된 컴포넌트와 달리, `forwardRef`로 반환된 컴포넌트는 `ref` prop도 받는다.

### 주의할 점

Strict Mode에서는 리액트가 렌더 함수를 두번 호출한다. 개발자 모드에서만 그렇고, 배포 환경에 영향을 주진 않는다. 만약 렌더 함수가 pure하면 (사실 그래야만 함) 컴포넌트 로직에 영향을 주진 않을 것이다.

`forwardRef`의 매개변수인 렌더 함수에 대해 더 자세히 알아보자.

```jsx
const MyInput = forwardRef(function MyInput(props, ref) {
  return (
    <label>
      {props.label}
      <input ref={ref} />
    </label>
  );
});
```

### 파라미터

- `props`
  부모 컴포넌트에서 넘겨주는 `props`들이다.
- `ref`
  `ref` 속성은 부모 컴포넌트로 부터 받는다. `ref`는 객체나 함수 형태이다. 만약 부모 컴포넌트가 `ref`를 넘겨주지 않으면, `ref`는 `null`이다.

<br>

## Usage

### Exposing a DOM node to the parent component

기본적으로 각 컴포넌트의 DOM 노드는 private하다. 하지만 가끔 부모 컴포넌트에 DOM 노드를 노출하는 것이 유용할 때가 있다. 예를 들어 포커싱하는 경우이다. 이럴 때 컴포넌트의 정의를 `forwardRef`로 감싸면 된다.

```jsx
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} />
    </label>
  );
});
```

두번째 인자로 받은 `ref`를 노출하고 싶은 DOM 노드에 전달하면 된다.

```jsx
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});
```

이것은 부모 컴포넌트인 `Form`이 `MyInput` 컴포넌트로 인해 노출된 `<input>` DOM 노드에 접근할 수 있게 한다.

```jsx
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

`Form` 컴포넌트는 `MyInput` 컴포넌트에게 ref를 전달한다. MyInput 컴포넌트는 `ref`를 브라우저 태그인 `<input>`에게 전달한다. 결과적으로 `Form` 컴포넌트는 `<input>` DOM 노드에 접근하여 `focus()` 함수를 호출할 수 있다.

컴포넌트 내부의 DOM 노드에 `ref`를 노출하면 나중에 컴포넌트 내부를 변경하기 더 어려워진다는 것을 명심해야 한다. 일반적으로 버튼이나 텍스트 입력과 같은 재사용 가능한 낮은 수준의 컴포넌트에서는 DOM 노드를 노출해도 괜찮으나, `avatar`나 `comment` 같은 애플리케이션 수준의 컴포넌트에서는 노출하지 않는게 좋다.

### Forwarding a ref through multiple components

`ref`를 DOM 노드로 전달하는 것 대신에 `MyInput` 같은 컴포넌트에 전달할 수도 있다.

```jsx
const FormField = forwardRef(function FormField(props, ref) {
  // ...
  return (
    <>
      <MyInput ref={ref} />
      ...
    </>
  );
});
```

만약 `MyInput` 컴포넌트가 `ref`를 `<input>`에 전달하면, `FormField`의 `ref`는 `<input>`을 참조하고 있을 것이다.

```jsx
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <FormField label="Enter your name:" ref={ref} isRequired={true} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

`Form` 컴포넌트는 `ref`를 정의하고 `FormField`에 전달한다. `FormField`는 `MyInput`에 그 `ref`를 전달하여 브라우저 DOM 노드 `<input>`에 전달한다.

### Exposing an imperative handle of a DOM node

전체 DOM 노드를 노출하는 것 대신에 imperative handle이라고 불리는 **사용자 지정 객체**를 노출할 수도 있다. 이렇게 하려면, DOM 노드를 보유하기 위해 별도의 `ref`를 정의해야 한다.

```jsx
const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  // ...

  return <input {...props} ref={inputRef} />;
});
```

받은 `ref`를 `useImperativeHandle`에 전달하고 `ref`에 노출하고 싶은 값을 지정하면 된다.

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

다른 컴포넌트가 `MyInput`에 대한 `ref`를 받으면 DOM 노드 대신 `{ focus, scrollIntoView }` 객체만 받게 된다. 이를 통해 DOM 노드에 대해 노출하는 정보를 최소로 제한할 수 있다.

<aside>
😵 <strong>주의</strong> <br>
ref 사용을 남용하지 말자. props으로 표현하기 어려운 imperative한 행동인 경우만 ref를 사용해야 한다.
</aside>

<br>

### References

- [react/forwardRef](https://react.dev/reference/react/forwardRef)

<br>
