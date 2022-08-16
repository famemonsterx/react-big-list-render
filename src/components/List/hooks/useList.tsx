import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { uuid } from "utils";

interface IUseList {
  renderItem: (index: number, key: string) => ReactNode
  length: number
}

const getIdNumber = (id: string) => {
  return Number(id?.replace('list-', ''))
}

export const useList = ({
  renderItem, length
}: IUseList) => {
  const [items, setItems] = useState<ReactElement<HTMLLIElement>[]>([])
  const first = useRef<HTMLLIElement>(null)
  const last = useRef<HTMLLIElement>(null)
  const [firstIndex, setFirstIndex] = useState(0)
  const [lastIndex, setLastIndex] = useState(0)
  const observer = useRef<IntersectionObserver | null>(null)

  const add = (index?: number) => {
    if (index && getIdNumber(items[0]?.props.id) < index) {
      setItems([...items, 1].map((item, index) => {
        const key = uuid()
        const newId = index+firstIndex
        if (item === 1) {
          return (
            <li ref={last} key={key} id={`list-${newId}`}>
              {renderItem(newId, key)}
            </li>
          )
        }
        return item as ReactElement<HTMLLIElement>
      }))
      setLastIndex(index)
    } else if (index && getIdNumber(items[0]?.props.id) > index) {
      setItems([1, ...items].map((item, index) => {
        const key = uuid()
        const newId = index+firstIndex-1
        if (item === 1) {
          return (
            <li ref={first} key={key} id={`list-${newId}`}>
              {renderItem(newId, key)}
            </li>
          )
        }
        return item as ReactElement<HTMLLIElement>
      }))
      setFirstIndex(state => state - 1)
    } else {
      setItems([...new Array(2)].map((item, index) => {
        const key = uuid()
        const newId = index + firstIndex
        return (
          <li ref={index === 0 ? first : last} key={key} id={`list-${newId}`}>
            {renderItem(newId, key)}
          </li>
        )
      }))
      setLastIndex(1)
    }
  }

  const remove = (index: number) => {
    setItems([...items]
        .filter(item => getIdNumber(item?.props?.id) !== index)
        .map((item) => {
          const key = uuid()
          if (index+1 === getIdNumber(item?.props.id)) {
            if (index === firstIndex) {
              const newId = firstIndex + 1
              setFirstIndex(newId)
              return (
                <li ref={first} key={key} id={`list-${newId}`}>
                  {renderItem(newId, key)}
                </li>
              )
            } else {
              const newId = lastIndex - 1
              setLastIndex(newId)
              return (
                <li ref={last} key={key} id={`list-${newId}`}>
                  {renderItem(newId, key)}
                </li>
              )
            }
          }
          return item
        })
    )
  }

  useEffect(() => {
    add()
  }, [])

  useEffect(() => {
    if (first?.current && observer?.current) {
      observer.current?.observe(first?.current)
    }
  }, [first?.current, observer?.current])

  useEffect(() => {
    if (last?.current && observer?.current) {
      observer.current?.observe(last?.current)
    }
  }, [last?.current, observer?.current])

  useEffect(() => {
    console.log(firstIndex, lastIndex)
  }, [firstIndex, lastIndex])

  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 1,
      root: document
    };
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        console.log(entry)
        if (entry.isIntersecting && entry.target.id === last?.current?.id) {
          add(lastIndex+1)
        }
        // if (!entry.isIntersecting && entry.target.id === first?.current?.id) {
        //   console.log(firstIndex)
        //   remove(firstIndex)
        // }
      })
    }, options)
    return () => {
      observer?.current?.disconnect()
    }
  })

  return { items }
}