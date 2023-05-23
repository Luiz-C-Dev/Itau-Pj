const formFields = document.querySelectorAll("input");

formFields.forEach((field) => {
  field.addEventListener("blur", () => checkField(field));
  field.addEventListener("invalid", (event) => event.preventDefault());
});

const errorTypes = ["valueMissing", "tooLong", "tooShort"];

const errorMessages = {
  cnpj: {
    valueMissing: "campo obrigatório.",
    tooShort: "cnpj inválido.",
  },
  razaoSocial: {
    valueMissing: "campo obrigatório.",
    tooLong: "tamanho máximo de 30 caracteres",
  },
  cpfRepresentanteLegal: {
    valueMissing: "campo obrigatório.",
    tooShort: "cpf inválido",
  },
  nomeRepresentanteLegal: {
    valueMissing: "campo obrigatório.",
    tooLong: "tamanho máximo de 20 caracteres",
  },
  comoDesejaSerChamado: {
    valueMissing: "campo obrigatório.",
    tooLong: "tamanho máximo de 10 caracteres.",
  },
  quantidadeDeFuncionarios: {
    valueMissing: "campo obrigatório.",
  },
  faturamentoAnual: {
    valueMissing: "campo obrigatório.",
  },
};

function checkField(field) {
  let message = "";
  field.setCustomValidity("");
  errorTypes.forEach((erro) => {
    if (field.validity[erro]) {
      message = errorMessages[field.name][erro];
      console.log(message);
    }
  });
  const errorMessage = field.parentNode.querySelector(".error__message");
  const inputValidator = field.checkValidity();

  if (!inputValidator) {
    errorMessage.textContent = message;
  } else {
    errorMessage.textContent = "";
  }
}

function applyInputMask() {
  const cnpj = document.getElementsByName("cnpj")[0];
  const cnpjMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };
  cnpj.addEventListener("input", (event) => {
    event.target.value = cnpjMask(event.target.value);
  });

  const cpf = document.getElementsByName("cpfRepresentanteLegal")[0];
  const cpfMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2");
  };
  cpf.addEventListener("input", (event) => {
    event.target.value = cpfMask(event.target.value);
  });

  const quantidadeDeFuncionarios = document.getElementsByName(
    "quantidadeDeFuncionarios"
  )[0];
  const quantidadeDeFuncionariosMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/, ".")
      .replace(/\B(?=(\d{3})+(?!\d))/, ".")
      .replace(/\B(?=(\d{3})+(?!\d))/, ".")
      .substr(0, 12);
  };
  quantidadeDeFuncionarios.addEventListener("input", (event) => {
    event.target.value = quantidadeDeFuncionariosMask(event.target.value);
  });

  const faturamentoAnual = document.getElementsByName("faturamentoAnual")[0];
  const faturamentoAnualMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^/, "R$ ")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };
  faturamentoAnual.addEventListener("input", (event) => {
    event.target.value = faturamentoAnualMask(event.target.value);
  });

  const razaoSocial = document.getElementsByName("razaoSocial")[0];
  const razaoSocialMask = (value) => {
    return value.replace(/[^A-Za-z0-9\s]/g, "").substr(0, 30);
  };
  razaoSocial.addEventListener("input", (event) => {
    event.target.value = razaoSocialMask(event.target.value);
  });

  const nomeRepresentanteLegal = document.getElementsByName(
    "nomeRepresentanteLegal"
  )[0];
  const nomeRepresentanteLegalMask = (value) => {
    return value.substr(0, 20);
  };
  nomeRepresentanteLegal.addEventListener("input", (event) => {
    event.target.value = nomeRepresentanteLegalMask(event.target.value);
  });

  const comoDesejaSerChamado = document.getElementsByName(
    "comoDesejaSerChamado"
  )[0];
  const comoDesejaSerChamadoMask = (value) => {
    return value.substr(0, 10);
  };
  comoDesejaSerChamado.addEventListener("input", (event) => {
    event.target.value = comoDesejaSerChamadoMask(event.target.value);
  });
}

const inputs = Array.from(document.querySelectorAll("input"));
const button = document.querySelector("button");
const checkInputs = () => {
  return inputs.every((input) => input.value !== "");
};
const updateButtonState = () => {
  button.disabled = !checkInputs();
};
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    applyInputMask();
    updateButtonState();
  });
});
