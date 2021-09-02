---
title: 'Tôi cố học ReactJS - State'
date: '2021-09-02'
summary: 'Props không thể thay đổi trong component nhưng `state` thì có. Đây cũng chính là lý do state được sử dụng trong các component mạng tính "dynamic" động đậy theo thời gian hoặc sự kiện.'
draft: false
tags: ['reactjs', 'selftaught']
layout: PostSimple
---

Props không thể thay đổi trong component nhưng `state` thì có. Đây cũng chính là lý do state được sử dụng trong các component mạng tính "dynamic" động đậy theo thời gian hoặc sự kiện.

<Image src="/static/images/props.png" width={640} height={350} />

<hr />
# State

Chúng ta cùng xem một `<Clock />` component có thể cập nhật thời gian sau mỗi giây

```js
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  )
}

function tick() {
  ReactDOM.render(<Clock date={new Date()} />, document.getElementById('root'))
}

setInterval(tick, 1000)
```

Sau mỗi giây clock sẽ cập nhật lại thời gian của nó, nhưng mà component Clock
kia không phải là một Clock đúng nghĩa, khi bạn dùng Clock component kia ở trong
một component khác như sau:

```js
<MyDesk>
  <Clock />
</MyDesk>
```

Clock sẽ không hoạt động, sẽ không cập nhập thời gian sau mỗi giây, nó cần hàm
`setInterval()` đi cùng, vậy thì `<Clock />` mình nó không phải là clock thật sự rồi.
Ai lại đi mua một cái vỏ đồng hồ riêng với một cái bộ hẹn giờ riêng, mà bộ hẹn giờ
thì phải có sẵn trong đồng hồ từ trước rồi => đấy mới là đồng hồ đúng nghĩa.
Vậy nên giờ phải cài cho Clock cái bộ hẹn giờ riêng của nó trước khi mang nó đi
bán, đi sử dụng.

- **Trước hết ta sẽ chuyển Clock sang Class component**

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}
```

- **Giờ chúng ta sẽ chuyển props.date và state.**

```js
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}
```

- **Thêm lifecycle vào class**

Trong ứng dụng với nhiều component, điều quan trọng là giải phóng tài nguyên
được dùng bới những component sau khi chúng bị gỡ đi.

Chúng ta muốn cài hẹn giờ vào Clock lúc nó được render vào trong DOM lần đầu tiên. Đây
là **"mounting"** trong React.

Chúng ta muốn hủy hẹn giờ khi Clock bị xóa (khi không còn clock thì tất nhiên phải
bỏ cái interval đi rồi để làm gì cho nặng trình duyệt). Đây gọi là **unmounting** trong React.

Chúng ta có thể định nghĩa những phương thức đặc biệt trong component class để
chạy code khi component mount và unmount. Các hàm đặc biệt đó là những hàm dược
cung cấp trong lifecycle:

```js
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 100)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date(),
    })
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}
```

- `componentDidMount` : sau khi component được render vào trình duyệt.
- `componentWillUnmount` : trước khi component bị xóa khỏi trình duyệt.

# Sử dụng state đúng cách

1. **không chỉnh sửa state trực tiếp. phải dùng `setState`, chỉ có một chỗ duy nhất bạn
   có thể gán giá trị cho state là ở constructor**

   ```js
   // Wrong
   this.state.wromg = 'hello'

   // Correct
   this.setState({ comment: 'hello' })
   ```

2. **State có thể cập nhật bất đồng bộ, bạn không nên dùng `this.state` để tính toán
   giá trị tiếp theo nó có thể xảy ra sai sót.**

   ```js
   // Wrong
   this.setState({
     counter: this.state.counter + this.props.increment,
   })

   // Corrrect
   this.setState((state, props) => {
     counter: state.counter + props.increment
   })
   ```

`this.setState` có thể truyền vào 1 đối tượng (nó sẽ cập nhập trong state đối tượng mới được truyền vào). Nếu truyền vào 1 một function thì function phải có 2 tham số `(state, props)` => state chính là giá trị trước của state., props chính là giá trị của props tại thời điểm cập nhật.

3. **State cập nhật được gộp lại.**
   Khi bạn gọi `setState()`, React sẽ gộp object mà bạn truyền vào vào trong current state.

Ví dụ :

```js
constructor(props){
    super(props);
    this.state = {
        posts: [],
        comments: []
    }
}
```

Khi ta update data:

```js
componentDidMount() {
    fetchPosts().then(response => {
        this.setState({
            posts: response.posts
        });
    });

    fetchComments().then(response => {
        this.setState({
            comments: response.comments
        });
    });
}
```

`this.setState({comments})` sẽ giữ lại `this.state.posts`, nhưng thay thế hoàn toàn
`this.state.comments`

# Data flow (dòng chảy dữ liệu à? Thôi tốt nhất ko nên dịch)

Bất kể là component cha hay con đều không biết một component kia là stateful hay
stateless, và nó cũng không nên quan tâm là component kia là function hay class.

Đây chính là lý do vì sao state thường được gọi là local (cục bộ) hay
encapsulated (đóng gói). State không thể bị truy cập bởi bất kì component nào khác
ngoài chính bản thân component chứa nó.

Một component có thể tạo state từ props được truyên vào

```js
;<FormattedDate date={this.state.date} />

function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}</h2>
}
```

FormattedDate component sẽ nhận date ở props của nó và sẽ không biết rằng date
được truyền vào từ props hay từ state hay được viết bằng tay.

Các component là độc lập hoàn toàn không liên quan đến nhau, với các dữ liệu đầu
vào là props khác thì thì chũng sẽ hiển thị kết quả khác nhau, nhưng cùng với
một cơ chế đã lập trình sẵn.
