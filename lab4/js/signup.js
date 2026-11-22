const BUTTON_RESET_DELAY = 2000;
const LINE_EXTRA_WIDTH = 30;


class SignUpData {
  constructor(login, email, password, agreement) {
    this.login = login;
    this.email = email;
    this.password = password;
    this.agreement = agreement;
    this.createdAt = new Date();
  }

  get maskedPassword() {
    return '*'.repeat(this.password.length);
  }

  printToConsole() {
    const css = getComputedStyle(document.documentElement);
    const purple = css.getPropertyValue('--purple').trim();
    const dark = css.getPropertyValue('--black-dark').trim();

    const rows = [
      ['Логин', this.login],
      ['E-mail', this.email],
      ['Пароль', this.maskedPassword],
      ['Согласие на обработку', this.agreement ? 'да' : 'нет'],
      ['Дата отправки', this.createdAt.toLocaleString('ru-RU')],
    ];

    const width = Math.max(...rows.map(([name]) => name.length));
    const line = '─'.repeat(width + LINE_EXTRA_WIDTH);
    const body = rows
        .map(([name, value]) => `  ${name.padEnd(width)} │ ${value}`)
        .join('\n');

    console.log(
        `%c Frame %c Новая регистрация\n${line}\n${body}\n${line}`,
        `background: ${purple}; color: ${dark}; font-weight: bold; border-radius: 4px; padding: 2px 6px;`,
        `color: ${purple}; font-weight: bold;`
    );
  }
}

const form = document.getElementById('signup-form');
const button = form.querySelector('.form__submit');
const buttonText = button.textContent;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const user = new SignUpData(
      form.elements.login.value.trim(),
      form.elements.email.value.trim(),
      form.elements.password.value,
      form.elements.agreement.checked
  );

  user.printToConsole();

  button.textContent = 'Готово!';
  button.disabled = true;

  setTimeout(() => {
    button.textContent = buttonText;
    button.disabled = false;
  }, BUTTON_RESET_DELAY);

  form.reset();
});