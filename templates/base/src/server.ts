import handler from "@tanstack/react-start/server-entry";
// {{I18N_IMPORTS}}

export default {
  fetch(request: Request) {
    // {{I18N_FETCH}}
    return handler.fetch(request);
  },
};
