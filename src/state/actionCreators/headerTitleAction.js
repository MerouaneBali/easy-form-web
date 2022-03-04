const headerTitleAction = (headerTitle) => {
  return (dispatch) => {
    dispatch({
      type: "update",
      payload: headerTitle,
    });
  };
};

export default headerTitleAction;
