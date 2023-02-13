---
date: '2023-02-08'
title: 'Describing the UI (1)'
categories: { type: ['스터디'], tags: ['React Docs Beta'] }
summary: '리액트 컴포넌트를 어떻게 만들고 커스텀하고 조건에 따라 보여줄지를 배운다.'
thumbnail: './react.png'
---

## 🌝 Describing the UI

### Your First Component

<aside>
⭐ 컴포넌트가 무엇이고, 리액트 앱에서 컴포넌트의 역할과 컴포넌트를 어떻게 작성하는지를 배운다.
</aside>

<br>

- <strong>Defining a component</strong>

  1. Export the component

     `export default` prefix는 리액트에서만 사용되는게 아닌 표준 자바스크립트 구문이다.

  2. Define the function

     `function App() { }` 으로 App이라는 자바스크립트 함수를 정의한다.

     🌚 함수 이름은 반드시 대문자로 시작해야한다.

  3. Add markup

     `JSX`를 사용하여 마크업 사이에 자바스크립트를 넣을 수 있다.

- <strong>Deep Dive: Components all the way down</strong> <br>
  컴포넌트는 재사용을 위해서만 사용하는 것은 아니다. 컴포넌트는 UI와 마크업 쉽게 구성할 수 있는 방법이다. 그렇기 때문에 일부 컴포넌트는 한 번만 사용될 수 있다.

### Importing and Exporting Components

<aside>
⭐ 루트 컴포넌트 파일이 무엇인지, 컴포넌트 import/export 방법, 언제 default 키워드를 쓰는지 등을 배운다.
</aside>

<br>

- <strong>The root component file</strong> <br>
  리액트에서는 보통 `src/App.js`가 최상위 컴포넌트 파일이고, 어떻게 셋업하느냐에 따라 달라질 수 있다.
  만약 `Next.js` 같은 파일 베이스 라우팅을 하는 프레임워크를 사용하면 최상위 컴포넌트는 각 페이지마다 다를 수 있다.
- <strong>Exporting and importing a component</strong>
  🌚 import 할 때 .js 파일 확장자를 생략하는 것도 가능하지만, 아래와 같이 작성하는 것이 기본 ES 모듈의 작동 방식에 가깝다.

  ```jsx
  import Gallery from './Gallery.js';
  ```

### Writing Markup with JSX

<aside>
⭐ 리액트에서 렌더링 로직과 마크업을 같이 쓰는 이유, JSX가 HTML과 다른점, JSX로 정보를 어떻게 보여주는지를 배운다.
</aside>

<br>

- <strong>JSX: Putting markup into JavaScript</strong> <br>
  웹이 더 interactive 해지고, 점점 로직이 콘텐츠를 결정하게 되었다. 자바스크립트가 HTML의 역할을 하게 된 것이다. 이것이 리액트에서 렌더링 로직과 마크업이 하나의 컴포넌트에 같이 있는 이유이다.
  - What’s a JSX Transform? <br>
    브라우저는 JSX를 이해할 수 없기 때문에 리액트 유저는 JSX 코드를 일반 JavaScript로 바꿔주는 Babel이나 TypeScript에 의지한다.
- <strong>The Rules of JSX</strong>

  1. Return a single root element

     여러 개의 요소를 하나의 컴포넌트에서 반환하기 위해서는 하나의 부모 태그로 묶어야 한다.

     빈 태그인 `Fragment`를 사용해도 된다. `Fragment`는 브라우저 HTML 트리에 흔적을 남기지 않고, 즉 DOM에 추가 노드를 추가하지 않고 요소들을 그룹화할 수 있다.

     - <strong>Deep Dive: Why do multiple JSX tags need to be wrapped?</strong> <br>
       JSX가 HTML처럼 보이지만, 내부적으로는 일반 자바스크립트 객체로 변환된다. 배열로 wrapping 하지 않고는 함수에서 두 개의 객체를 반환할 수 없기 때문에 하나의 부모 태그로 묶어야하는 것이다.
       ```jsx
       return {} {} // 불가능
       return [{}, {}] // 가능
       ```
       ```jsx
       return (
         <>
           <div className="good">parent</div>
         </>
       );
       ```
       compiles into:
       ```jsx
       React.createElement(
         React.Fragment,
         null,
         React.createElement(
           'div',
           {
             className: 'good',
           },
           'parent',
         ),
       );
       ```

  2. Close all the tags

     닫힘 태그가 필수적이다. self-closing 태그도 `<img />` 처럼 닫혀야 한다.

  3. camelCase ~~all~~ most of the things!

     JSX는 JavaScript로 바뀌고 JSX로 작성된 속성은 JavaScript 객체의 키가 된다. 컴포넌트에서 이러한 속성을 변수로 쓰고 싶은 경우, 변수 이름에 대한 제한이 있다. 예를 들어 이름에 `대시(-)`를 포함하거나 `class`와 같은 예약어를 사용할 수 없다. 그래서 리액트에서는 HTML와 SVG의 많은 속성들이 카멜케이스로 작성되어 있다.

     🌚 Historical Reason으로 `aria-*`와 `data-*` 속성은 대시가 있는 HTML로 작성된다.

### JavaScript in JSX with Curly Braces

<aside>
⭐ quotes로 string 전달하는 법, curly braces를 사용해서 변수 참조하는 법과 함수 호출하는 법, 객체를 사용하는 법을 배운다.
</aside>

<br>

- <strong>Using “double curlies”: CSS and other objects in JSX</strong> <br>
  CSS style이나 JavaScript 객체는 curly braces `{ }`로 한 번 더 감싸서 값을 전달한다.

<br>

### References

- [React Docs Beta](https://beta.reactjs.org/)
- [Babel · The compiler for next generation JavaScript](https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlLYmICQAPAHz2mlMAmMAbohHQBDAM4iAckIC2qALwAiAOZw4XeYgDWqAJ4KYalgAchFMFCYB6HrzYdEl24lwBuIgF8iQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.20.15&externalPlugins=&assumptions=%7B%7D)

<br>
