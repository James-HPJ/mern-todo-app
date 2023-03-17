import { useReducer } from "react";

const formReducer = (state, action) => {
  if (action.type === "CONTENT_CHANGE") {
    return {
      ...state,
      content: action.content,
      isValid:
        action.content.trim().length > 0 &&
        state.title.trim().length > 0 &&
        state.date.length > 0,
    };
  }
  if (action.type === "TITLE_CHANGE") {
    return {
      ...state,
      title: action.title,
      isValid:
        action.title.trim().length > 0 &&
        state.content.trim().length > 0 &&
        state.date.length > 0,
    };
  }

  if (action.type === "DATE_CHANGE") {
    return {
      ...state,
      date: action.date,
      isValid:
        action.date.length > 0 &&
        state.content.trim().length > 0 &&
        state.title.trim().length > 0,
    };
  }

  if (action.type === "RESET") {
    return {
      title: "",
      content: "",
      date: "",
      isValid: false,
    };
  }

  return {
    ...state,
  };
};

const useForm = () => {
  const [formInput, dispatchForm] = useReducer(formReducer, {
    title: "",
    content: "",
    date: "",
    isValid: false,
  });

  const contentInputHandler = (value) => {
    dispatchForm({ type: "CONTENT_CHANGE", content: value });
  };

  const titleInputHandler = (value) => {
    dispatchForm({ type: "TITLE_CHANGE", title: value });
  };

  const dateInputHandler = (value) => {
    dispatchForm({ type: "DATE_CHANGE", date: value });
  };

  const resetInputs = () => {
    dispatchForm({ type: "RESET" });
  };

  return {
    formInput,
    contentInputHandler,
    titleInputHandler,
    dateInputHandler,
    resetInputs,
  };
};

export default useForm;
