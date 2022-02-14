type ButtonProps = {
  children: React.ReactNode
}

const Button = (props: ButtonProps) => {
  const { children } = props
  return <div>{children}</div>
}

export default Button
