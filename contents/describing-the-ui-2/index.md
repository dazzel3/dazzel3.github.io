---
date: '2023-02-10'
title: 'Describing the UI (2)'
categories: { type: ['React'], tags: ['React Docs'] }
summary: 'Passing Props to Component, Conditional Rendering, Rendering Lists, Keeping Components Pure'
thumbnail: './react.png'
---

## 🌝 Describing the UI

### Passing Props to Component

<aside>
⭐ 컴포넌트에 props을 전달하는 법과 받은 props을 읽는 법, props의 default value를 정의하는 법 등을 배운다.
</aside>

<br>

- <strong>Specifying a default value for a prop <br></strong>
  prop에 기본 값을 설정해두고, 아무 값을 전달하지 않는 경우에는 기본 값이 설정된다. 그러나 `null` 또는 `0`을 전달하면 기본 값이 사용 되지 않는다.
- <strong>Forwarding props with the JSX spread syntax <br></strong>
  Spread syntax로 props를 전달하면 더 간결하게 전달이 가능하다. 모든 곳에서 아래와 사용하면 뭔가 잘못된 것이니 제한적으로 사용하자.
  ```jsx
  function Profile(props) {
    return (
      <div className="card">
        <Avatar {...props} />
      </div>
    );
  }
  ```
- <strong>How props change over time <br></strong>
  컴포넌트는 시간이 지나면서 다른 props를 받을 수 있다. props는 항상 static하진 않다!
  > **A component may receive different props over time.** Props are not always static!

Props는 처음에만 아니라 모든 시점에서 컴포넌트의 데이터를 반영한다. 그러나 props는 불변한다. 컴포넌트가 props를 변경해야 할 때는 컴포넌트에 새로운 props를 전달하도록 요청해야 한다. 그러면 이전 props는 버려지고, 결국 자바스크립트 엔진은 props가 가져간 메모리를 회수한다.

props를 바꾸려고 하지말자. 상호작용이 필요한 경우에는 state를 쓰면 된다.

### Conditional Rendering

<aside>
⭐ 조건에 따라 다른 JSX를 반환하는 법, 리액트에서 자주 사용하는 조건 구문 등을 배운다.
</aside>

<br>

- <strong>Deep Dive: Are these two examples fully equivalent? <br></strong>
  `ex. 1`

  ```jsx
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
  ```

  `ex. 2`

  ```jsx
  return <li className="item">{isPacked ? name + ' ✔' : name}</li>;
  ```

  JSX 요소는 인스턴스가 아니다. 왜냐하면 JSX 요소는 내부 상태를 보유하지 않았고, 실제 DOM 노드가 아니기 때문이다. 따라서 위 두 예시는 완전히 동일하다.

- <strong> Logical AND operator `&&` <br></strong>
  논리 연산자 &&를 사용하면 조건이 `true`일 때는 일부 JSX를 렌더링하고, 그렇지 않으면 아무것도 렌더링하지 않는다.

  🌚 `&&` 왼쪽에 숫자를 넣지 말자. 조건을 판별하기 위해 자바스크립트는 왼쪽을 자동으로 `boolean`로 변환한다. 어떤 값이 `0`이면 아무것도 렌더링하지 않는다고 가정하기 쉽지만 실제로는 `0` 그 자체를 렌더링하기 때문에 왼쪽은 값이 `boolean`이 되어야 한다.

### Rendering Lists

<aside>
⭐ map이나 filter 함수를 사용해서 컴포넌트를 렌더링 하는 법과 key를 사용하는 때와 이유를 배운다.
</aside>

<br>

- <strong>Keeping list items in order with `key` <br></strong>
  키를 안쓰면 아래와 같은 Warning이 나온다.
  > Each child in a list should have a unique “key” prop.

unique한 `string`이나 `number` 값을 사용해서 리스트의 각 아이템에 key를 주면 해결된다.

```jsx
<li key={person.id}>...</li>
```

`key`는 React에게 각 컴포넌트에 해당하는 리스트 아이템을 알려주어 나중에 매치시킬 수 있다. 리스트 아이템이 정렬되거나 삽입되거나 삭제되는 등 어떤 변화가 생겼을 때, `key`가 React에게 정확히 무슨일이 일어났는지 알려주고 DOM 트리를 올바르게 업데이트하는 것에 도움을 준다.

- <strong> Deep Dive: Displaying several DOM nodes for each list item <br></strong>

`<>…</>` Fragment 구문으로는 키를 전달할 수 없기 때문에, `<div>`나 `<Fragment>`를 사용하면 된다.

```jsx
const listItems = people.map(person => (
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
));
```

- <strong> Where to get your `key` </strong>
  - 데이터베이스의 데이터
    데이터베이스의 `key`나 `ID`를 쓰면 자연스럽게 unique 값을 사용할 수 있게 된다.
  - 로컬에서 생성된 데이터
    데이터가 로컬에서 생성되고 유지되는 경우, incrementing counter인 [crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) 또는 [uuid](https://www.npmjs.com/package/uuid) 패키지를 사용한다.
- <strong> Rules of keys </strong>
  - `key`는 형제 간에 고유해야 한다. (단, 다른 배열에서는 같은 키를 사용해도 된다.)
  - `key`는 변경되어서 안되고, `key`의 목적에 어긋나면 안된다. 렌더링하는 동안 생성하면 안된다.
- <strong> Why does React need keys? <br></strong>
  폴더의 파일 이름과 배열에서 JSX `key`는 비슷한 목적으로 사용된다. 이를 통해 형제 간에 아이템을 고유하게 인식할 수 있게 해준다.

  🌚 배열의 인덱스를 `key`로 사용하지 말자. 배열에 변화가 생기면 인덱스가 변하고, 이는 혼란스러울 수 있다. 또, `key`를 즉석에서 생성하지 말자. 즉석으로 생성하면 렌더링 시에 키가 일치하지 않아 모든 컴포넌트와 DOM이 매번 다시 생성된다.

### Keeping Components Pure

<aside>
⭐ purity가 무엇이고 버그를 피하는데 어떤 도움을 주는지, 컴포넌트를 pure하게 유지하는 법과 Strict Mode를 사용하는 방법을 배운다.
</aside>

<br>

- <strong> Purity: Components as formulas <br></strong>

  Pure function은 아래와 같은 특성이 있다.

  - 함수가 호출되기 전에 이미 존재한 객체나 변수를 바꾸지 않는다.
  - 같은 입력을 하면 항상 같은 결과가 나와야 한다.
    React에서는 위의 개념을 사용하여 모든 컴포넌트는 pure function이라고 가정하고 있다. 이것은 작성한 컴포넌트가 항상 같은 JSX를 반환한다는 것을 의미한다. 마치 수학 공식처럼 말이다. <br>

    <br>

Pure function의 규칙을 어긴 예시를 보자. 변수를 직접적으로 바꾸면서 같은 컴포넌트를 렌더링해도 다른 결과가 나온다.

```jsx
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

Pure function으로 바꾸면 아래와 같다. `guest`라는 prop에만 의존하여 반환한다.

```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

- <strong> Deep Dive: Detecting impure calculations with StrictMode <br></strong>
  React는 개발 중에 각 컴포넌트 함수를 2번 호출하는 `Strict Mode`를 제공한다. 이는 함수가 Pure function의 규칙을 어겼는지 찾는 것을 도와준다.
  `Strict Mode`는 배포에 아무 영향이 없다. 그래서 사용자를 위한 서비스를 느리게 만들진 않는다.

- <strong> Local mutation: Your component’s little secret <br></strong>
  이미 존재하는 변수를 렌더링 중에 바꾸는 것을 `mutation`이라고 부른다. <br>
  Pure function은 함수 범위 밖의 변수나 호출 전에 생성된 객체를 변경하지 않는다. 그러나 아래와 같이 작성하면 변수나 객체를 변경하는 것이 문제되지 않는다. 왜냐하면 내부에서 동일한 렌더링 중에 생성했기 때문이다.

  ```jsx
  function Cup({ guest }) {
    return <h2>Tea cup for guest #{guest}</h2>;
  }

  export default function TeaGathering() {
    let cups = [];
    for (let i = 1; i <= 12; i++) {
      cups.push(<Cup key={i} guest={i} />);
    }
    return cups;
  }
  ```

- <strong> Where you *can* cause side effects <br></strong>
  화면 업데이트, 데이터 변경 등 여러 변경 사항을 `side effects`라고 한다. 렌더링 동안에 일어나는게 아니라 `side`에서 일어난다.
  React에서 `side effects`는 주로 이벤트 핸들러에 속해있다. 이벤트 핸들러가 컴포넌트 내부에 정의되어 있어도 렌더링 동안 실행되지는 않는다. 그래서 이벤트 핸들러를 pure하게 하지 않아도 된다.

  - <strong> Deep Dive: Why does React care about purity? </strong>
    1. 컴포넌트를 여러 환경(예: 서버)에서 실행시킬 수 있다. 같은 입력에서는 같은 결과를 반환하기 때문에 하나의 컴포넌트가 많은 사용자 요청을 처리할 수 있다.
    2. 입력이 변경되지 않은 경우 컴포넌트 렌더링을 하지 않아 성능이 향상될 수 있다. Pure function은 항상 같은 결과를 반환해서 캐시하기에 안전하다.
    3. 컴포넌트 트리를 렌더링하다 일부 데이터가 변경되면 다시 렌더링을 할 수 있다. 언제든 계산을 중단해도 pure function의 특징 덕분에 안전하기 때문이다.

### References

- [react/passing-props-to-a-component](https://react.dev/learn/passing-props-to-a-component)
- [react/conditional-rendering](https://react.dev/learn/conditional-rendering)
- [react/rendering-lists](https://react.dev/learn/rendering-lists)
- [react/keeping-components-pure](https://react.dev/learn/keeping-components-pure)

<br>
