import { List, ListItem } from "components";
import { createListItems } from "utils";

export const App = () => {
  const items = createListItems()
  const renderItem = (index: number, key: string) => {
    return (
      <ListItem item={items[index]} key={key} />
    )
  }
  return (
    <div className={'app'}>
      <List length={items.length} renderItem={renderItem} />
    </div>
  )
}