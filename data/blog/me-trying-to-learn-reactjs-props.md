---
title: 'Tôi cố học ReactJS - Props'
date: '2021-09-02'
summary: 'Me trying to learn ReactJS. Obviously dịch docs từ reactjs.org'
draft: false
tags: ['reactjs', 'selftaught']
layout: PostSimple
---

> **Me trying to learn ReactJS. Obviously dịch docs từ reactjs.org**

<Callout type="warning">
- Quan điểm : Những cái gì ko dịch được hoặc dịch ra mà ko hiểu được nghĩa thì tốt nhất ko dịch. Mặc định hiểu nó là vậy
- Bài viết có nhiều chỗ lồng tiếng Anh lẫn tiếng Việt (do tiếng Anh ngắn hơn
    hoặc ko dịch được) có thể gây ức chế cho người đọc. Nhấp nút đỏ ở bên trên
    tab trình duyệt trước khi cảm thấy ức chế.
</Callout>

# Components and Props

Components (các thành phần) : cho phép chia nhỏ ứng dụng ra các thành phần
nhỏ hơn, để có thể sử dụng lại. Nó giống với JS function nó có thể nhận vào
tham số gọi là props và trả về các elements React.

Có 2 loại component là **Functional** và **Class**

- Funtional Components :
  Được định nghĩa như một function của JS:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```

Nó chấp nhận đầu vào (agrument là props - properties) và trả về giá trị là một
React element. Gọi nó là "function components" bởi vì nó là Javascript
function.

- Class components :

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

# Render một component

React component có thể là một thẻ DOM như : h1, div, ... nhưng nó người dùng
cũng có thể tự định nghĩa một component.

```js
const element = <Welcome name="Sara" />
```

Khi React nhìn thấy các component của user, nó sẽ truyền vào thuộc tính JSX vào
component này dưới dạng 1 object. Object đấy được gọi là "props".
Ví dụ :

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

const element = <Welcome name="Sara" />
ReactDOM.render(element, document.getElementById('root'))
```

<Callout type="info" title="Tóm lại">
- React gọi các thuộc tính truyền vào component là props (properties)
- Một component sẽ trả về một React element (là thẻ tag html học một component
   tự định nghĩa).
</Callout>

<Callout type="danger" title="Lưu ý">
Luôn bắt đầu tên của component với chữ cái in hoa, React coi tất cả
component mà tên bắt đầu với chữ cái in thường là thẻ DOM. Vậy nên nếu muốn tự
định nghĩa một component thì tên của component phải bắt đầu bằng chữ in hoa.
</Callout>

# Composing component (biên dịch)

Component có thể chứa các component khác trong nó. Điều này giúp chúng ta cả
thể sử dụng cùng một component ở nhiều cấp độ khác nhau. Một button, form,
dialog hay screen trong React đều coi là các components.

Ví dụ ta có thể render component `<Welcome />` nhiều lần :

```js showLineNumbers
function Welcome(props) {
  return <h1> Hello, {props.name}</h1>
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Michael" />
      <Welcome name="Sucre" />
      <Welcome name="Lincoln" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# Phân tách Component

Đừng ngại phân chia component ra thành các components nhỏ hơn.

```js showLineNumbers
function Commment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="avatar" src={props.author.avatarUrl} alt={props.author.name} />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="CommentText">{props.text}</div>
      <div className="CommentDate">{props.date}</div>
    </div>
  )
}
```

Component trên mô tả đúng một component cho comment trên các trang mạng xã hội
có đầy đủ như : avatar, nội dung, tên tác giả, thời gian. Nhưng nó khó cho thay
đổi thuộc tính vì các thứ lồng vào nhau (như bạn copy cái navbar boootstrap html - đúng là một đống mess,
nếu ko có một engineRenderer thì cứ chỗ nào cần hiện navbar là bạn phải copy cái đống code kìa paste vào đó.).
Việc lồng vào nhau cũng khiến cho việc sử dụng lại code khó khăn hơn. Giờ thì
hãy phân chia component trên ra.

Đầu tiên, ta sẽ phân tách component Avatar:

```js showLineNumbers
function Avatar(props) {
  return <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
}
```

Component Avatar ko cần biết nó sẽ được render ở đâu, cho đối tượng nào? Bạn có
thể component Avatar để hiện thị ảnh cho tác giả, người đọc, người thông
thường... Đây chính là lợi ịch của việc sử dụng lại code. write less do more.

<Callout type="info" title="NOTE">
- props được truyền vào component là read-only ko thể thay đổi
- Một hàm ko thay đổi props truyền vào được gọi là "pure" tinh khiết.
- Tất cả React component đều phải là hàm "pure" ko thể thay đổi giá trị của
    props.
</Callout>

=> Nếu muốn component thay đổi theo thời gian, sự kiện thì ta phải dùng State.
