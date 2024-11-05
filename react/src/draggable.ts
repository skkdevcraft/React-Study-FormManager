export function makeDraggable(element: HTMLElement) {
    let isDragging = false;
    let offsetX: number, offsetY: number;
  
    element.style.position = "absolute";
    element.style.cursor = "move";
  
    const startDragging = (e: MouseEvent) => {
      isDragging = true;
      const rect = element.getBoundingClientRect();
      offsetX = e.clientX - (rect.left + rect.width / 2);
      offsetY = e.clientY - (rect.top + rect.height / 2);
    };
  
    const drag = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      element.style.left = `${newX}px`;
      element.style.top = `${newY}px`;
    };
  
    const stopDragging = () => {
      isDragging = false;
      // Unhook the global listeners
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", stopDragging);
    };
  
    // Hook the global listeners
    element.addEventListener("mousedown", (e) => {
      startDragging(e);
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", stopDragging);
    });
  }