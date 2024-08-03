  // const [zIndexArray, setZIndexArray] = useState<number[]>(() => {
  //   const elements = boardExemplar.getElements();
  //   return elements.length > 0
  //     ? [Math.max(...elements.map((element) => element.getZIndex()))]
  //     : [0];
  // });

  // const [draggingElement, setDraggingElement] = useState<ElementModel | null>(
  //   null,
  // );

  // useEffect(() => {
  //   const handleMouseMove = (event: MouseEvent) => {
  //     if (draggingElement) {
  //       const newX = event.clientX - draggingElement.getPosition().x;
  //       const newY = event.clientY - draggingElement.getPosition().y;
  //       draggingElement.setPosition({ x: newX, y: newY });
  //     }
  //   };

  //   const handleMouseUp = () => {
  //     setDraggingElement(null);
  //   };

  //   const handleMouseMoveCapture = (event: MouseEvent) => {
  //     document.mousePosition = { clientX: event.clientX, clientY: event.clientY };
  //   };

  //   document.addEventListener('mousemove', handleMouseMove);
  //   document.addEventListener('mouseup', handleMouseUp);
  //   document.addEventListener('mousemove', handleMouseMoveCapture, true); // Capture the event to set mousePosition

  //   return () => {
  //     document.removeEventListener('mousemove', handleMouseMove);
  //     document.removeEventListener('mouseup', handleMouseUp);
  //     document.removeEventListener('mousemove', handleMouseMoveCapture, true);
  //   };
  // }, [draggingElement]);

  // const handlePaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
  //   const mousePosition = document.mousePosition;
  //   if (!mousePosition) {
  //     console.error('Failed to access mouse position');
  //     return;
  //   }

  //   const { clientX, clientY } = mousePosition;

  //   const clipboardData = event.clipboardData;
  //   if (!clipboardData) {
  //     console.error('Failed to access clipboard data');
  //     return;
  //   }

  //   const createNewElement = (content: string, type: 'text' | 'image') => {
  //     const newElement = new ElementModel(
  //       clientX,
  //       clientY,
  //       content,
  //       type,
  //       Math.max(...zIndexArray) + 1,
  //     );
  //     boardExemplar.addElement(newElement);
  //     setZIndexArray([...zIndexArray, newElement.getZIndex()]);
  //   };

  //   const items = Array.from(clipboardData.items);
  //   const lastItem = items[items.length - 1];

  //   if (lastItem.kind === 'file' && lastItem.type.startsWith('image/')) {
  //     const file = lastItem.getAsFile();
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         createNewElement(reader.result as string, 'image');
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   } else if (lastItem.kind === 'string') {
  //     try {
  //       const text = await navigator.clipboard.readText();
  //       const cleanText = text.replace(/<[^>]*>/g, '').trim();
  //       if (cleanText) {
  //         createNewElement(cleanText, 'text');
  //       }
  //     } catch (error) {
  //       console.error('Error reading clipboard:', error);
  //     }
  //   }
  // };

  // const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const targetId = (event.target as HTMLElement).parentElement?.id;

  //   const selectedElement = boardExemplar
  //     .getElements()
  //     .find((element) => element.getId() === targetId);
  //   if (selectedElement) {
  //     setDraggingElement(selectedElement); // Set the selected element for dragging
  //   }
  // };
  