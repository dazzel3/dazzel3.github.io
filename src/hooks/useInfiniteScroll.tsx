import { MutableRefObject, useState, useMemo, useRef, useEffect } from 'react';
import { PostListItemType } from 'types/postItem';

export interface useInfinitieScrollType {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  postList: PostListItemType[];
}

const NUMBER_OF_ITEMS_PER_PAGE = 10;

const useInfiniteScroll = (
  selectedCategory: string,
  posts: PostListItemType[],
): useInfinitieScrollType => {
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null);
  const [count, setCount] = useState<number>(1);

  const postListByCategory = useMemo<PostListItemType[]>(
    () =>
      posts.filter(
        ({
          node: {
            frontmatter: {
              categories: { type },
            },
          },
        }: PostListItemType) =>
          selectedCategory !== 'All' ? type.includes(selectedCategory) : true,
      ),
    [selectedCategory],
  );

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;

      setCount(value => value + 1);
      observer.disconnect();
    });
  }, []);

  useEffect(() => {
    setCount(1);
  }, [selectedCategory]);

  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0 ||
      observer.current === null
    )
      return;

    const childNodes = containerRef.current.children;
    observer.current.observe(childNodes[childNodes.length - 1]);
  }, [count, selectedCategory]);

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
};

export default useInfiniteScroll;
