const mouseEnterHandler = (listItemId: number) => {
  const allLi = document.querySelectorAll('li');
  allLi.forEach((li) => {
    li.classList.remove('active');
  });
  const app = document.getElementById(`${listItemId}`);
  app?.classList.add('active');
};

// TODO remove this if not needed
const mouseLeaveHandler = (listItemId: number) => {
  const li = document.getElementById(`${listItemId}`);
  if (li !== null) {
    li.classList.remove('active');
  }
};

const disablePointerOnKeybord = (hasPointerEvent: boolean) => {
  const ulElement = document.getElementById('autocomplete_list');
  if (ulElement !== null) {
    ulElement.style.pointerEvents = hasPointerEvent ? 'none' : 'auto';
  }
};

const setActiveOnListElement = (active: number) => {
  const allLi = document.querySelectorAll('li');
  allLi.forEach((li) => {
    li.removeAttribute('class');
  });
  const li = document.getElementById(`${active}`);
  li?.classList.add('active');
  li?.scrollIntoView();
};

const handleSearch = async (
  data: string[],
  query: string
): Promise<string[]> => {
  return data.filter(
    (suggestion: any) =>
      suggestion.toLowerCase().indexOf(query.toLowerCase()) > -1
  );
};

export {
  mouseEnterHandler,
  mouseLeaveHandler,
  disablePointerOnKeybord,
  setActiveOnListElement,
  handleSearch,
};
