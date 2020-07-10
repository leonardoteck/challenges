/* eslint-disable import/prefer-default-export */

export const httpError = (exception) => {
  console.dir(exception);
  let details;
  if (!exception) details = 'Ocorreu um erro.';
  else if (exception.message === 'Request failed with status code 400'
    && exception.response && exception.response.data && exception.response.data.message) {
    details = exception.response.data.message;
  } else {
    details = `Erro ao processar requisição (${exception.message})`;
  }

  alert(details);
};
