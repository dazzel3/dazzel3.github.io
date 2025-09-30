---
date: '2025-09-12'
title: 'React.memo로 성능 최적화하기'
categories: { type: ['React'], tags: ['React', 'Security'] }
summary: 'React.memo로 불필요한 리렌더링을 줄이는 방법을 알아보자.'
thumbnail: './react.png'
---

`React.memo()`로 컴포넌트를 감싸면 React는 불필요한 리렌더링을 방지하기 위해 shallow comparison(얕은 비교)를 수행한다. 성능 최적화용 기술이며, React 성능 튜닝 시 반드시 이해하고 있어야 하는 개념이다.


### React.memo란?

```tsx
const MyComponent = React.memo(function MyComponent(props) {
  // ...
});
```
React.memo()는 고차 컴포넌트(HOC)이다.
props가 바뀌지 않았다면 컴포넌트 리렌더링을 건너뛴다.
props가 바뀌었는지 판단할 때 얕은 비교(shallow comparison)를 사용한다.

<br>

### shallow comparison이란?

얕은 비교는 객체의 1단계 속성만 비교하고, 내부 깊은 값까지는 확인하지 않는다.
원시 타입 값은 그대로 비교한다.
객체, 배열, 함수는 참조(주소)가 같아야 동일하다고 판단한다.

```tsx
const a = { x: 1 };
const b = { x: 1 };

a === b; // false (내용 같아도 참조가 다름)

const c = a;
a === c; // true (같은 객체 참조)
```
즉, 렌더링마다 새 객체/배열/함수를 만들어 props로 넘기면 React.memo가 소용없게 된다.

<br>

### React.memo 동작 방식
부모 컴포넌트가 리렌더링될 때 React는 이전 props와 새로운 props를 shallow compare
- 같다고 판단되면 자식 컴포넌트의 렌더링을 건너뜀
- 다르다고 판단되면 렌더링 실행

```tsx
const Child = React.memo(({ name }) => {
  console.log("Child rendered");
  return <div>{name}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Child name="John" />
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
```
- 버튼 클릭 시 Parent는 리렌더링됨
- Child는 props.name이 바뀌지 않았으므로 렌더링 건너뜀
- 콘솔에 "Child rendered"는 처음 한 번만 찍힘

<br>

### 주의할 점

**1. 객체/배열/함수 props**

- 매번 새로 생성되면 shallow compare에서 다르다고 판단 → 불필요한 리렌더링 발생
- 해결: useMemo, useCallback으로 참조 고정

```tsx
const user = useMemo(() => ({ name: "John" }), []);
<Child user={user} />
```

**2. custom 비교 함수 비용**

- React.memo(Component, areEqual) 형태로 직접 비교 함수를 줄 수 있음
- 하지만 비교 로직이 무겁다면 성능 최적화 효과가 사라짐

**3. props 비교 비용 자체**

- React.memo는 리렌더링을 막는 대신 props 비교 연산이 수행됨
- 아주 단순한 컴포넌트(버튼, 단순 텍스트)에서는 오히려 이득이 거의 없음
- 반복 렌더링되는 리스트 아이템이나 무거운 UI 컴포넌트일 때 효과 큼

<br>

### 일반적인 React 렌더링 흐름
1. 부모 컴포넌트가 리렌더링됨
2. 자식 컴포넌트도 기본적으로 다시 렌더 함수 실행
3. 새로운 Virtual DOM 생성
4. 기존 Virtual DOM과 비교(diffing)
5. 실제 DOM에 최소한의 변경만 반영

즉, 리렌더 → Virtual DOM 생성 → diff → DOM 업데이트가 기본 흐름이다.

<br>

### React.memo가 있으면?

```tsx
const Child = React.memo(({ name }) => {
  console.log("Child rendered");
  return <div>{name}</div>;
});
```
props가 변하지 않았다면
- 렌더 함수 실행하지 않음
- Virtual DOM을 새로 만들지 않음
- diffing & patching 과정도 없음

➡️ 성능적으로 큰 최적화 효과를 얻을 수 있습니다.

<br>

### 정리
React.memo는 props가 변하지 않으면 렌더링을 건너뛴다.

얕은 비교를 사용하기 때문에 객체/배열/함수 props는 주의가 필요하다.

useMemo, useCallback으로 참조를 고정하면 효과적이다.

custom 비교 함수도 가능하지만 비용이 크면 역효과다.

단순한 컴포넌트는 memo로 얻는 이득이 적고, 리스트·무거운 UI에서 효과가 크다.


> React.memo는 불필요한 리렌더링을 줄이는 강력한 도구지만, 모든 컴포넌트에 무조건 적용하는 것은 권장되지 않습니다.
>
> props 비교 비용과 컴포넌트 복잡도를 함께 고려해야 하며, 반복 렌더링되는 리스트 아이템이나 성능에 민감한 UI 컴포넌트에서 큰 효과를 발휘합니다.
