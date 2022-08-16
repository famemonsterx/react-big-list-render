import './style.css'
import { ReactNode } from "react";
import { useList } from "components/List/hooks/useList";

interface IList<T> {
  renderItem: (index: number, key: string) => ReactNode
  length: number
}

export const List = <T,>({
  renderItem, length
}: IList<T>) => {
  const { items, container } = useList({ renderItem, length })
  return (
    <ul className={'list'} ref={container}>
      {items}
    </ul>
  )
}