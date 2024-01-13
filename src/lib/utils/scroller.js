export const scroller = (node, index) => {
  let isDown = false;
  let startX;
  let scrollLeft;
  let nodeChildren = Array.from(node.children);
  let currentIndex = index;

  const options = {
    root: node,
    threshold: 0.5,
  };

  const observerCallback = (entries, observer) => {
    const active = entries.reduce((max, entry) =>
      entry.intersectionRatio > max.intersectionRatio ? entry : max,
    );
    if (active.intersectionRatio > 0) {
      // sets pageIndex to current active index
      currentIndex = Number(active.target.getAttribute("data-index"));
      node.dispatchEvent(
        new CustomEvent("indexChange", { detail: currentIndex }),
      );
    }
  };

  const observer = new IntersectionObserver(observerCallback, options);

  const stopScrolling = () => {
    isDown = false;
  };

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - node.offsetLeft;
    scrollLeft = node.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - node.offsetLeft;
    const SCROLL_SPEED = 2;
    const walk = (x - startX) * SCROLL_SPEED;
    node.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    stopScrolling();
  };

  const handleMouseLeave = () => {
    stopScrolling();
  };

  nodeChildren.forEach((el) => observer.observe(el));

  node.addEventListener("mousedown", handleMouseDown);
  node.addEventListener("mousemove", handleMouseMove);
  node.addEventListener("mouseup", handleMouseUp);
  node.addEventListener("mouseleave", handleMouseLeave);

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMouseDown);
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseup", stopScrolling);
      node.removeEventListener("mouseleave", handleMouseLeave);
      nodeChildren.forEach((el) => observer.unobserve(el));
    },
  };
};
