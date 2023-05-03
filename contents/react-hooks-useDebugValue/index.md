---
date: '2023-02-08'
title: 'useDebugValue란?'
categories: { type: ['React'], tags: ['React Docs'] }
summary: 'React Hook 중 useDebugValue에 대해 알아보자.'
thumbnail: './react.png'
---

### useDebugValue

`useDebugValue`는 React DevTools에서 사용자 지정 hook에 label을 추가할 수 있는 React Hook이다. 이 hook은 아무것도 return 하지 않는다.

```jsx
useDebugValue(value, format?)
```

- `value`

  React DevTools에 보여주고 싶은 값으로, 어떤 타입이든 가능하다.

- optional `format`

  formatting 함수이다. 컴포넌트를 검사할 때, React DevTools는 value를 매개변수로 받아 이 formatting 함수를 호출한다. 그리고 formatting된 value를 return 해준다. 만약 해당 함수를 작성하지 않은 경우에는 value 그 자체가 보여질 것이다.

### Usage

- **Adding a label to a custom Hook**

  React DevTools에서 debug value를 읽기쉽게 하기 위해서, 커스텀 훅의 최상위 레벨에서 useDebugValue를 호출한다. 아래의 예시에서 만약 useDebugValue를 사용하지 않으면 `OnlineStatus: “Online”` 대신 `OnlineStatus: true`가 보여질 것이다.

  ```jsx
  import { useDebugValue } from 'react';

  function useOnlineStatus() {
    // ...
    useDebugValue(isOnline ? 'Online' : 'Offline');
    // ...
  }
  ```

  모든 커스텀 훅에 debug value를 추가할 필요는 없다. 검사하기 어렵고 복잡한 데이터 구조를 가진 경우에 가장 유용하다고 할 수 있다.

<br>

- **Deferring formatting of a debug value**
  `useDebugValue`의 두번째 매개변수로 formatting 함수를 넘길 수 있다. 컴포넌트를 검사할 때, React DevTools는 해당 함수를 호출하여 formatting 된 value를 반환해 보여준다.

  ```jsx
  useDebugValue(date, date => date.toDateString());
  ```

  이렇게 하면 컴포넌트가 실제로 검사되지 않는 한 잠재적으로 비용이 많이 드는 로직을 실행하지 않아도 된다.

<br>

### References

- [react/useDebugValue](https://react.dev/reference/react/useDebugValue)

<br>
