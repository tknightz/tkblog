const Callout = (props) => {
  return (
    <div className={`callout callout--${props.type}`}>
      <p className="callout__title">{props.title || props.type}</p>
      <div className="callout__content">{props.children}</div>
    </div>
  )
}

export default Callout
