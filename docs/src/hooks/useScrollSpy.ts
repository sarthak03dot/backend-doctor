import { useState, useEffect } from 'react';

export function useScrollSpy(ids: string[], offset: number = 100) {
  const [activeId, setActiveId] = useState<string>(ids[0] || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `-${offset}px 0px -80% 0px` }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [ids, offset]);

  return activeId;
}
