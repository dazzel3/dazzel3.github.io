---
date: '2023-05-23'
title: '리액트 기초 (2)'
categories:
  {
    type: ['React'],
    tags:
      ['React', '컴포넌트 스타일링', 'useMemo', 'React.memo', 'useCallback'],
  }
summary: 'React 컴포넌트 스타일링 방법과 리렌더링과 관련된 hook들에 대해 알아보자.'
thumbnail: './react.png'
---

## 컴포넌트 스타일링

리액트에서 컴포넌트에 스타일링 하는 방법에 대해 알아보자.

### 스타일시트 적용

외부 CSS파일을 import 하여 사용하는 방법이다.

### Inline style 적용

동적으로 스타일을 결정하는 경우에 요소의 속성으로 style을 주는 방법이다.

### CSS in JS 적용

여러 라이브러리가 있는데 `emotion`이라는 라이브러리를 사용하여 적용할 수 있다. 아래 명령어로 설치하면 된다.

```bash
yarn add @emotion/react @emotion/styled
```

간단한 사용법은 다음과 같으며, 자세한 내용은 [emotion 공식 문서](https://emotion.sh/docs/introduction)에서 확인할 수 있다.

```jsx
import styled from '@emotion/styled';

export default function App() {
  return <Box />;
}

const Box = styled.div`
  width: 100px;
  height: 100px;
`;
```

## useMemo

컴포넌트는 아래와 같은 상황에서 리렌더링 된다.

- 함수 컴포넌트는 자신의 상태가 변경될 때
- 부모 컴포넌트로부터 받는 `prop`이 변경될 때
- 부모 컴포넌트의 상태가 변경될 때

만약 연산 속도가 느린 컴포넌트라면 렌더링 시간이 오래 걸릴 것이다. 이러한 경우 최적화를 위해 `useMemo`를 사용하는 것이 필요하다.

두번째 인자로 배열을 넘겨주는데, 배열 안의 `n`이 변경 될 때만 `sum()` 함수를 실행시키기 위해 `useMemo` 함수를 사용하여 다른 상태 값의 변경과 관계없이 독립적으로 실행하도록 만들어 주었다.

```jsx
const result = useMemo(() => sum(n), [n]);
```

## React.memo

부모 컴포넌트의 상태가 변경되면 자식 컴포넌트도 같이 리렌더링 된다. 이렇게 부모 컴포넌트는 변경되었지만 자식 컴포넌트가 변경되지 않았을 때 리렌더링하지 않도록 도와주는 함수이다.

자식 컴포넌트에서 리렌더링되는 함수를 `React.memo`로 감싸주면 된다.

## useCallback

컴포넌트가 리렌더링될 때 함수가 다시 정의되는 것을 막기 위해 사용되는 hook이다.

checkbox 하나를 클릭했는데 `Checkbox` 컴포넌트에 연결되어 있는 함수들이 전부 다시 선언되는 문제를 `useCallback`을 사용해 해결할 수 있다.

```jsx
...
const foodChange = useCallback((e) => setFoodOn(e.target.checked), [])
const clothesChange = useCallback((e) => setClothesOn(e.target.checked), [])
const shelterChange = useCallback((e) => setShelterOn(e.target.checked), [])

return (
  <div>
    <Checkbox ... onChange={foodChange} />
    <Checkbox ... onChange={clothesChange} />
    <Checkbox ... onChange={shelterChange} />
  </div>
)
```

## Custom Hook

사용자 정의 hook은 기존 hook을 조합해서 만들 수 있다. 이를 사용하면 코드의 중복을 줄일 수 있고 컴포넌트도 더 깔끔하게 사용할 수 있다.

```jsx
import { useCallback, useState } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState(state => !state), []);

  return [state, toggle];
};

export default useToggle;
```

```jsx
import useToggle from './useToggle';

function App() {
  const [on, toggle] = useToggle();

  return (
    <div>
      <button onClick={toggle}>{on ? 'true' : 'false'}</button>
    </div>
  );
}

export default App;
```

<br>

### References

- [프로그래머스 프론트엔드 데브코스 3기](https://school.programmers.co.kr/)

<br>
