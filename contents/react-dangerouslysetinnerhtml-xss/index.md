---
date: '2025-07-07'
title: 'React에서 dangerouslySetInnerHTML 안전하게 쓰는 법'
categories: { type: ['React'], tags: ['React', 'Security'] }
summary: 'React에서 dangerouslySetInnerHTML을 사용할 때 발생할 수 있는 보안 문제와 안전하게 다루는 방법을 알아보자.'
thumbnail: './react.png'
---

### dangerouslySetInnerHTML

React에서는 JSX로 직접 HTML을 작성하지만, 간혹 문자열 형태의 HTML을 렌더링해야 할 때 사용한다.

```tsx
<div dangerouslySetInnerHTML={{ __html: "<strong>Hello</strong>" }} />
```

이런 식으로 DOM에 직접 HTML을 삽입한다.

<br>

## 문제점

**1. XSS (Cross-Site Scripting) 공격 위험**

- 외부 입력값을 그대로 넣으면 악성 스크립트 삽입 가능
- 이게 그대로 렌더링되면 사용자 브라우저에서 실행됨
    
    ```jsx
    const html = `<img src=x onerror="alert('XSS!')" />`
    ```
    

**2. 브라우저 보안 정책 우회**

- React는 의도적으로 `dangerouslySetInnerHTML`이라는 이름을 붙여 경고함
- DOM 조작이 직접 이루어지므로 React의 Virtual DOM 관리와 어긋날 수 있음
- React는 `dangerouslySetInnerHTML`로 삽입된 영역을 다시 diff하지 않기 때문에, **업데이트 누락이나 UI 깨짐**이 발생할 수 있음

**3. HTML injection 가능성**

- 신뢰할 수 없는 데이터가 포함된 경우 HTML 구조가 깨질 수 있음

<br>

## 언제 써도 괜찮은가?

- 정적이고 신뢰할 수 있는 HTML 문자열만 사용하는 경우
    
    (예: CMS에서 관리자가 입력한 HTML, 마크다운 렌더링 결과 등)
    
- 필요한 경우에만 제한적으로 사용, 절대로 사용자 입력 그대로 넘기면 안 됨

<br>

## 대안

**1. HTML 파서 라이브러리 사용**

예: [`html-react-parser`](https://github.com/remarkablemark/html-react-parser)

```tsx
import parse from 'html-react-parser';

const safeHTML = '<strong>안녕하세요</strong>';
return <div>{parse(safeHTML)}</div>;
```

- JSX 변환 가능
- 일부 태그 필터링도 지원

**2. sanitize 후 사용**

예: [`DOMPurify`](https://github.com/cure53/DOMPurify)

```tsx
import DOMPurify from 'dompurify';

const clean = DOMPurify.sanitize(userHtml);
return <div dangerouslySetInnerHTML={{ __html: clean }} />;
```

- 보안 취약점 방어에 특화
- 신뢰할 수 없는 HTML을 렌더링할 때 반드시 sanitize 필요

<br>

## 결론

- 위험성: XSS 및 보안 위협, React DOM 무결성 훼손 가능
- 허용 조건: 신뢰된 콘텐츠, sanitize된 HTML
- 하지 말아야 할 것: 사용자 입력을 그대로 dangerouslySetInnerHTML로 렌더링
- 대안: `html-react-parser`, `DOMPurify`, 혹은 직접 컴포넌트 구성

> 가능하면 사용을 피하고, 반드시 필요한 경우엔 보안 필터를 거친 후 사용하기
> 
> 
> 특히 금융/보안/기업 서비스에서는 감사 로그 및 필터링 체계와 함께 쓰는 것이 안전하다.
>