import './style.css'

interface IListItem <T> {
  item: number
}

export const ListItem = <T,>({
  item
}: IListItem<T>) => {
  return (
    <div className={'listItem'}>
      {item}
    </div>
  )
}