---
date: '2025-09-08'
title: 'React와 클로저 트랩'
categories: { type: ['React'], tags: ['React'] }
summary: 'React 함수형 컴포넌트에서 왜 클로저 트랩이 생기는지, 어떻게 해결할 수 있는지 알아보자.'
thumbnail: './react.png'
---

## React와 클로저 트랩

### 클로저(Closure)란 무엇인가?

- **클로저**는 함수가 만들어질 당시의 **외부 환경(스코프)** 을 기억하는 기능이다.
- 함수가 실행될 때 그 함수 안에서 선언되지 않은 변수(자유 변수)를 참조하면, 자바스크립트는 함수가 선언된 위치의 변수를 찾아서 기억한다.

```jsx
function outer() {
  const name = "React";
  function inner() {
    console.log(name); // outer의 변수 name 참조
  }
  return inner;
}

const fn = outer(); // inner 함수 반환
fn(); // "React" 출력
```

- `inner` 함수는 `outer` 함수의 변수를 **기억한다.**
- 이런 “기억된 함수”를 **클로저**라고 한다.

### React 함수형 컴포넌트와 클로저

React의 함수형 컴포넌트는 사실 **단순한 함수이다.**

하지만 중요한 점은

- **렌더링될 때마다 이 함수 전체가 다시 실행된다.**
- 이 과정에서 내부에 있는 함수들도 **새롭게 생성된다.**
- 즉, 함수 안에서 이벤트 핸들러나 콜백을 정의하면, 그 함수는 렌더 시점의 상태/props를 **클로저로 기억한다.**

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    console.log(count); // 현재 렌더 시점의 count 기억
  }

  return <button onClick={handleClick}>Click</button>;
}
```

- `handleClick`은 “버튼이 눌렸을 때 실행되는 함수”인데, 실제로는 **생성 당시의 count 값**을 클로저로 기억한다.

### 클로저 트랩(Closure Trap) 문제

클로저 트랩이란? **최신 값이 아니라, 과거 렌더링 때의 값만 계속 참조하는 상황을 뜻한다.**

```tsx
function Timer() {
  const [count, setCount] = useState(0);

  const startTimer = () => {
    setTimeout(() => {
      console.log(count); // ❌ 오래된 count 출력
    }, 3000);
  };

  return (
    <><button onClick={startTimer}>Start Timer</button>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </>
  );
}
```

- 버튼 클릭 시 타이머 설정 → 3초 뒤 실행
- 하지만 3초 사이에 count가 변해도, 콜백은 **설정 당시의 count**만 기억함
- 이유: `setTimeout` 안의 함수가 생성될 때의 클로저를 참조하기 때문

### 해결 방법

**1) 의존성 배열 올바르게 작성**

`useEffect`, `useCallback` 같은 훅은 의존성 배열을 기반으로 동작한다. 의존성을 정확히 넣어야 매번 새 클로저로 갱신된다.

```tsx
useEffect(() => {
  const interval = setInterval(() => {
    console.log(count); // ✅ 최신 count 출력
  }, 1000);
  return () => clearInterval(interval);
}, [count]); // count가 바뀌면 effect 재실행
```

**2) useRef로 최신 값 저장**

`useRef`는 컴포넌트가 리렌더링되어도 **동일한 객체를 유지**한다. `.current` 값을 갱신하면 항상 최신 값에 접근 가능하다.

```tsx
const countRef = useRef(count);

useEffect(() => {
  countRef.current = count; // 매 렌더마다 최신값 저장
}, [count]);

useEffect(() => {
  const id = setInterval(() => {
    console.log(countRef.current); // ✅ 최신 값 참조
  }, 1000);
  return () => clearInterval(id);
}, []);
```

**3) 함수형 업데이트로 안전하게 상태 변경**

콜백 내부에서 오래된 값을 참조할 위험이 있다면, **이전 값(prev)을 기준으로 업데이트**하면 된다.

```tsx
setTimeout(() => {
  setCount(prev => prev + 1); // ✅ 항상 최신 상태 기준으로 업데이트
}, 2000);
```
### 정리

- React 함수 컴포넌트는 **렌더링마다 새 함수 실행 → 새 클로저 생성**
- 이벤트 핸들러/비동기 콜백은 **그 렌더 당시의 상태를 기억**
- 문제: 오래된 값을 참조하는 “클로저 트랩” 발생
- 해결
    - 의존성 배열 정확히 작성
    - `useRef`로 최신 값 보관
    - 함수형 업데이트(`prev => ...`) 활용