// Focus navigation search bar on keypress for both Mac and Windows

export const focusSearchDropdown = () => {
  window.addEventListener('keydown', function (e) {
    if ((e.ctrlKey && e.keyCode === 70) || (e.metaKey && e.keyCode === 70)) {
      if (
        document.getElementById('search-component-dropdown') !==
        document.activeElement
      ) {
        e.preventDefault();
        document.getElementById('search-component-dropdown').focus();
      } else {
        return true;
      }
    }
  });
};
