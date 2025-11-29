import handler from "@tanstack/react-start/server-entry";
// {{I18N_IMPORTS}}

export default {
  fetch(req: Request): Response | Promise<Response> {
    // {{I18N_FETCH}}
    return handler.fetch(req);
  },
};
