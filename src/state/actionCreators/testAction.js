const testAction = (amount) => {
  return (dispatch) => {
    dispatch({
      type: "test",
      payload: amount,
    });
  };
};

export default testAction;
