import * as React from "react"

export default function InfiniteScroll({
  isLoading,
  hasMore,
  next,
  threshold = 1,
  root = null,
  rootMargin = "0px",
  reverse,
  children
}) {
  const observer = React.useRef()
  // This callback ref will be called when it is dispatched to an element or detached from an element,
  // or when the callback function changes.
  const observerRef = React.useCallback(
    element => {
      let safeThreshold = threshold
      if (threshold < 0 || threshold > 1) {
        console.warn(
          "threshold should be between 0 and 1. You are exceed the range. will use default value: 1"
        )
        safeThreshold = 1
      }
      // When isLoading is true, this callback will do nothing.
      // It means that the next function will never be called.
      // It is safe because the intersection observer has disconnected the previous element.
      if (isLoading) return

      if (observer.current) observer.current.disconnect()
      if (!element) return

      // Create a new IntersectionObserver instance because hasMore or next may be changed.
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            next()
          }
        },
        { threshold: safeThreshold, root, rootMargin }
      )
      observer.current.observe(element)
    },
    [hasMore, isLoading, next, threshold, root, rootMargin]
  )

  const flattenChildren = React.useMemo(
    () => React.Children.toArray(children),
    [children]
  )

  return (
    <>
      {flattenChildren.map((child, index) => {
        if (!React.isValidElement(child)) {
          process.env.NODE_ENV === "development" &&
            console.warn("You should use a valid element with InfiniteScroll")
          return child
        }

        const isObserveTarget = reverse
          ? index === 0
          : index === flattenChildren.length - 1
        const ref = isObserveTarget ? observerRef : null
      
        return React.cloneElement(child, { ref })
      })}
    </>
  )
}
