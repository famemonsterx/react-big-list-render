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
  const { items, } = useList({ renderItem, length })
  return (
    <ul className={'list'}>
      {items}
    </ul>
  )
}