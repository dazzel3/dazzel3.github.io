---
date: '2023-05-22'
title: '리액트 기초 (1)'
categories:
  {
    type: ['React'],
    tags: ['React', '컴포넌트', 'props', 'useEffect', 'useRef'],
  }
summary: 'React에 대한 간단한 설명과 자주 사용하는 포인트에 대해 알아보자.'
thumbnail: './react.png'
---

## React 소개

리액트는 사용자 인터페이스를 구축하기 위한 자바스크립트 라이브러리 중 하나이다. 리액트를 구성하는 기능들은 최소한의 노력으로 최대의 효율을 내기 위함이다.

- 2011년 부터 사용
- 2013년 5월 오픈소스로 공개됨
- 안정적인 기술 스택

### React 특징

- Reactive Programming이다.
  - React는 상태를 관찰하고 변화가 발생할 경우 연관된 곳에서 연산이 수행된다.
- MVC에서 리액트는 V만 관리한다. 여기서 View는 컴포넌트이다. 컴포넌트는 재사용이 가능한 독립적인 객체이며 런타임 시점에 사용된다.
  - 컴포넌트는 트리 구조로 나타낼 수 있다.
  - 컴포넌트 조합으로 View를 구성한다.
- Virtual DOM이다.
  - 필요한 부분만 한 번에 렌더링한다.
  - 성능보다는 개발을 쉽게 하기 위해 사용되었다.

## create-react-app, JSX

### create-react-app

새로운 리액트 앱을 만들기 쉽게 도와준다.

```bash
npx create-react-app [app이름]
```

### JSX

자바스크립트에 XML을 추가한 확장한 문법이다. UI가 어떻게 생겨야 하는지 설명하기 위해 React와 함께 사용할 것을 권장한다.

- 자바스크립트에서 이미 class가 예약어이기 때문에 HTML의 class부분에 className을 사용해야한다.
- 최상위가 하나여야 한다.
- 표현식이나 조건문, 반복문도 넣을 수 있다. 중괄호 내부에 작성하면 된다.

## 컴포넌트

리액트의 컴포넌트는 함수이다. UI를 추상적으로 바라보고 공통점을 찾아 컴포넌트를 만들면 재사용할 수 있는 컴포넌트를 만들 수 있다. **컴포넌트에서 데이터는 단방향으로 전달된다.**

- ref. **atomic design**

### props

props를 사용하여 부모 컴포넌트에서 자식 컴포넌트에게 데이터를 넘겨줄 수 있다.

```jsx
// props.size => 구조분해할당
function Button({ size = 30 }) {
	return (
		<button style={ width: size }></button>
	)
}
```

```jsx
import Button from './Button.js'

function App() {
	return (
		...
		<Button size={50} />
	)
}
```

### children

props에 children을 사용하면 자식 컴포넌트 태그 내부의 내용이 children에 전달된다.

```jsx
function Paragraph({ children }) {
  return <p>{children}</p>;
}
```

```jsx
import Paragraph from './Paragraph.js'

function App() {
	return (
		...
		<Paragraph>
			<code>App.js</code> is running.
		</Paragraph>
	)
}
```

## 분기와 반복

### 분기

상태 값이 `true`인지 `false`인지에 따라 요소를 보여줄지 말지를 나타낼 수 있다. 논리곱(&&)을 사용하거나 삼항연산자를 사용하면 된다.

```jsx
function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>Toggle</button>
      {visible && <h1>Hi</h1>}
    </div>
  );
}
```

### 반복

`map`이나 `filter` 등의 고차함수를 사용하여 요소를 반복해줄 수 있다. `map`을 사용할 때는 꼭 요소에 `key` 값을 넣어주어야 한다.

```jsx
const Board = ({ articles }) => {
  return (
    <ul>
      {articles.map(articles => (
        <li key={articles.id}>{articles.title}</li>
      ))}
    </ul>
  );
};
```

## 이벤트 바인딩

### 컴포넌트에서 지역 상태 관리하는 법

`useState()`를 사용하여 지역 상태를 관리할 수 있다. 아래에서 `count`가 상태이고, `setCount`가 상태 값을 변경할 수 있는 함수를 나타낸다.

```jsx
const [count, setCount] = useState(0);
```

### 컴포넌트에 이벤트 바인딩하기

이벤트를 처리할 함수를 만들어서 요소의 이벤트에 바인딩해주면 된다.

```jsx
...

const handleIncrease = () => {
	setCount(count + 1)
}

return (
	...
	<button onClick={handleIncrease}>+</button>
)
```

### 부모 컴포넌트에게 메세지 전달하기

`props`를 통해 전달해줄 수 있다. 아래에서 `props`로 함수를 넘겨주는 것을 확인해보자.

```jsx
function Counter({ onChange }) {

	const handleIncrease = () => {
		setCount(count + 1)
		if (onChange) onChange(count + 1)
	}

	return (
		...
		<button onClick={handleIncrease}>+</button>
	)
}
```

```jsx
import { useState } from 'react';
import Counter from './Counter.js';

function App() {
  const [totalCount, setTotalCount] = useState(0);

  return (
    <div>
      totalCount: {totalCount}
      <Counter onChange={count => setTotalCount(count)} />
    </div>
  );
}
```

## useEffect

무언가 변화가 있을 때 감지하여 반응하는 hook이다. `useEffect`는 컴포넌트가 처음 로드될 때 실행된다. 상태 변화를 감지하거나 전역적인 이벤트를 사용할 때 쓸 수 있다. `return`으로 반환된 함수(cleanup 함수)는 컴포넌트가 제거될 때 실행된다.

## useRef

DOM에 직접 접근할 때 사용하거나 지역 변수로 사용할 때 사용할 수 있다.

여기서 지역 변수로 사용하는 것은 `useState`로도 할 수 있지만 큰 차이가 있다.

- `useState`는 값이 변경될 때 다시 렌더링을 한다.
- `useRef`는 값이 변경되어도 다시 렌더링하지 않는다.
  - input에 계속 값을 입력하는 경우, input이 계속 렌더링되는 것을 방지하기 위한 경우에 사용

<br>

### References

- [프로그래머스 프론트엔드 데브코스 3기](https://school.programmers.co.kr/)

<br>
